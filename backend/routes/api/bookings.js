const express = require("express");
const router = express.Router();

const moment = require("moment");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Booking, Owner } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Sequelize, Op } = require("sequelize");
const booking = require("../../db/models/booking");

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
    res.status(403).json({ message: "Booking couldn't be found" });
  } else if (bookingToDelete.userId != req.user.id) {
    res.status(401).json({ message: "Authentication required" });
  } else if (bookingToDelete.startDate <= currentDate) {
    //  && currentDate <= bookingToDelete.endDate (to delete past bookings)
    res
      .status(403)
      .json({ message: "Bookings that have been started can't be deleted" });
  } else bookingToDelete.destroy();

  res.status(200).json({ message: "Successfully deleted" });
});


// edit booking by booking id with authorized user
router.patch("/:bookingId", requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;

  const currentDate = new Date();

  let dates = [];
  let momentStart = moment(startDate);
  let momentEnd = moment(endDate);
  while (momentStart.isBefore(momentEnd) || momentStart.isSame(momentEnd)) {
    dates.push(new Date(momentStart));
    momentStart.add(1, "days");
  }

  const booking = await Booking.findByPk(req.params.bookingId, {
    where: {
      userId: req.user.id,
    },
  });

  const spotBookings = await Booking.findAll({
    where: {
      spotId: booking.spotId,
    },
  });
  let currentBookings = [];
  spotBookings.forEach((spotBooking) => {
    let momentStart = moment(spotBooking.startDate);
    let momentEnd = moment(spotBooking.endDate);
    while (momentStart.isBefore(momentEnd) || momentStart.isSame(momentEnd)) {
      currentBookings.push(new Date(momentStart));
      momentStart.add(1, "days");
    }
  });

    if (!booking) {
      res.status(404).json({ message: "Booking couldn't be found" });
    } else if (booking.userId != req.user.id) {
      res.status(401).json({ message: "Authentication required" });
    } else if (startDate >= endDate) {
      res
        .status(400)
        .json({
          message: "Validation error",
          statusCode: 400,
          errors: ["endDate cannot come before startDate"],
        });
    } else if (booking.endDate <= currentDate) {
      res.status(403).json({message: "Past bookings can't be modified"})
    } else if (compareDates(dates, currentBookings)) {
        res.status(403).json({message: "Sorry, this spot is already booked for the specified dates",
    statusCode: 403,
errors: [
    "Start date conflicts with an existing booking",
    "End date conflicts with an existing booking"
]})
    } else {
      booking.update({
        startDate: startDate,
        endDate: endDate,
      });
      booking.save();
    }
  res.json(booking);
});

function compareDates(arr1, arr2) {
    let set = new Set(arr2.map(date => date.getTime()));
    for(let i = 0; i < arr1.length; i++) {
        if(set.has(arr1[i].getTime())) {
            return true
        }
    }
    return false
}

module.exports = router;