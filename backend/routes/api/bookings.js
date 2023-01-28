const express = require("express");
const router = express.Router();

const moment = require("moment");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Spot,
  Booking,
  User,
  Review,
  SpotImage,
  ReviewImage,
  sequelize,
} = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Sequelize, Op } = require("sequelize");

// find all bookings
router.get("/", async (req, res) => {
  const bookings = await Booking.findAll();
  // console.log(bookings)
  res.json(bookings);
});

router.delete("/:bookingId", requireAuth, async (req, res) => {
  const currentDate = new Date();
  const bookingToDelete = await Booking.findByPk(req.params.bookingId);

  if (!bookingToDelete) {
    res.status(403).json({ message: "Booking couldn't be found", statusCode: 404 });
  } else if (bookingToDelete.userId != req.user.id) {
    res.status(401).json({ message: "Authentication required", statusCode: 401 });
  } else if (bookingToDelete.startDate <= currentDate) {
    //  && currentDate <= bookingToDelete.endDate (to delete past bookings)
    res
      .status(403)
      .json({ message: "Bookings that have been started can't be deleted", statusCode: 403 });
  } else bookingToDelete.destroy();

  res.status(200).json({ message: "Successfully deleted", statusCode: 200 });
});

// edit booking by booking id with authorized user
router.put("/:bookingId", requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body;

  const currentDate = new Date();

  let dates = [];
  let momentStart = moment(startDate);
  let momentEnd = moment(endDate);
  while (momentStart.isBefore(momentEnd) || momentStart.isSame(momentEnd)) {
    dates.push(moment(momentStart));
    momentStart.add(1, "days");
  }

  const booking = await Booking.findByPk(req.params.bookingId, {
    where: {
      userId: req.user.id,
    },
  });
  if (!booking) {
    return res.status(404).json({ message: "Booking couldn't be found", statusCode: 404 });
  }
  const spotBookings = await Booking.findAll({
    where: {
      spotId: booking.spotId,
      userId: {
        [Op.ne]: req.user.id,
      },
    },
  });
  let currentBookings = [];
  spotBookings.forEach((spotBooking) => {
    let momentStart = moment(spotBooking.startDate);
    let momentEnd = moment(spotBooking.endDate);
    while (momentStart.isBefore(momentEnd) || momentStart.isSame(momentEnd)) {
      currentBookings.push(moment(momentStart));
      momentStart.add(1, "days");
    }
  });

  if (booking.userId != req.user.id) {
    return res.status(401).json({ message: "Authentication required", statusCode: 401 });
  } else if (startDate >= endDate) {
    return res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errors: ["endDate cannot come before startDate"],
    });
  } else if (booking.endDate <= currentDate) {
    return res.status(403).json({ message: "Past bookings can't be modified", statusCode: 403 });
  } else if (compareDates(dates, currentBookings)) {
    return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: [
        "Start date conflicts with an existing booking",
        "End date conflicts with an existing booking",
      ],
    });
  } else {
    booking.update({
      startDate: startDate,
      endDate: endDate,
    });
    booking.save();
  }
  res.json(booking);
});

// compares moments to see if they match
function compareDates(arr1, arr2) {
  let set = new Set();

  arr2.forEach((dateString) => {
    let dateString1 = dateString.format("YYYY-MM-DD");
    set.add(dateString1);
  });

  for (let i = 0; i < arr1.length; i++) {
    let dateString2 = arr1[i].format("YYYY-MM-DD");
    if (set.has(dateString2)) {
      return true;
    }
  }
  return false;
}



// get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res) => {

  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
      },
    ],
  });
  if (!bookings.length) {
    return res.status(200).json({ message: "Current user has no bookings", statusCode: 200 });
  }
  let response = []
  for await(let booking of bookings) {
      const image = await SpotImage.findOne({
        where: {
          spotId: booking.Spot.id,
          preview: true
        }
      })
      if(image) {
        booking.Spot.dataValues.previewImage = image.url
      } else {
        booking.Spot.dataValues.previewImage = 'No preview image'
      }
  }

      bookings.forEach(booking => {

      
    response.push({
      id: booking.id,
      userId: booking.userId,
      spotId: booking.spotId,
      startDate: booking.startDate.toISOString().slice(0,10),
      endDate: booking.endDate.toISOString().slice(0,10),
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
      Spot: {
          id: booking.Spot.id,
          ownerId: booking.Spot.ownerId,
          address: booking.Spot.address,
          city: booking.Spot.city,
          state: booking.Spot.state,
          country: booking.Spot.country,
          lat: booking.Spot.lat,
          lng: booking.Spot.lng,
          name: booking.Spot.name,
          price: booking.Spot.price,
          previewImage: booking.Spot.dataValues.previewImage
      }
      })
  })
  res.json({ Bookings: response });
  // res.json(bookings)
  // res.json(spotImages)
});

module.exports = router;
