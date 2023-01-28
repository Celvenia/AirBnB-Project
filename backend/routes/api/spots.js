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
const { Op, where } = require("sequelize");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const booking = require("../../db/models/booking");
const { response } = require("express");

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .isString()
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("stars needs to be an integer between 1 and 5"),
  handleValidationErrors,
];

const validateBooking = [
  check("startDate")
    .exists({ checkFalsy: true })
    .isDate()
    .withMessage("startDate is required"),
  check("endDate")
    .exists({ checkFalsy: true })
    .isDate()
    .withMessage("endDate is required"),
  handleValidationErrors,
];

const validateQuery = [
  check("page")
    .if(check("page").exists())
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
    .if(check("size").exists())
    .isInt({ min: 1 })
    .withMessage("Size must be greater than or equal to 1"),
  check("maxLat")
    .if(check("maxLat").exists())
    .isFloat({ min: -90, max: 90 })
    .withMessage("Maximum latitude is invalid"),
  check("minLat")
    .if(check("minLat").exists())
    .isFloat({ min: -90, max: 90 })
    .withMessage("Minimum latitude is invalid"),
  check("minLng")
    .if(check("minLng").exists())
    .isFloat({ min: -180, max: 180 })
    .withMessage("Maximum longitude is invalid"),
  check("maxLng")
    .if(check("maxLng").exists())
    .isFloat({ min: -180, max: 180 })
    .withMessage("Minimum longitude is invalid"),
  check("minPrice")
    .if(check("minPrice").exists())
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  check("maxPrice")
    .if(check("maxPrice").exists())
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  handleValidationErrors,
];

// get all spots
router.get("/", validateQuery, async (req, res) => {
  let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  let where = {};

  page = parseInt(page);
  size = parseInt(size);
  if (Number.isNaN(page) || page < 0) page = 1;
  if (Number.isNaN(size) || size < 0 || size > 20) size = 20;
  if (maxLng) where.lng = { [Op.lte]: maxLng };
  if (minLng) where.lng = { [Op.gte]: minLng };
  if (maxLat) where.lat = { [Op.gte]: maxLat };
  if (minLat) where.lat = { [Op.lte]: minLat };
  if (minPrice) where.price = { [Op.gte]: minPrice };
  if (maxPrice) where.price = { [Op.lte]: maxPrice };

  // where.limit = size
  // where.offset = size * (page -1)

  const spots = await Spot.findAll({
    where,
    attributes: {
      include:
      [[sequelize.literal(`(SELECT url FROM SpotImages WHERE spotId = Spot.id AND preview = true)`),`previewImage`]],
      exclude: ['createdAt', 'updatedAt']
  },
    include: [{
      model: Review,
      attributes: ["stars"],
    },
    {
      model: SpotImage,
    }],
    limit: size,
    offset: size * (page - 1),
  });

  let response = [];
  spots.forEach((spot) => {
    let reviews = spot.Reviews;
    // spot.dataValues.numReviews = reviews.length
    let stars = 0;
    if (reviews) {
      reviews.forEach((review) => {
        stars += review.stars;
      });
    }
    const {
      id,
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      createdAt,
      updatedAt,
      previewImage,
    } = spot;
    response.push({
      id,
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      createdAt,
      updatedAt,
      avgRating: stars / reviews.length || "no reviews for this spot",
      previewImage: spot.dataValues.previewImage || false
    });
  });
  res.json({ Spots: response, page, size });
  // res.json(spots)
});

router.get("/current", async (req, res) => {
  const userSpots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
    attributes: {
      include:
      [[sequelize.literal(`(SELECT url FROM SpotImages WHERE spotId = Spot.id AND preview = true)`),`previewImage`]],
      exclude: ['createdAt', 'updatedAt']
    }
  });
  if (!userSpots) {
    res.status(404).json({ message: "User has no spots" });
  }
  res.json({ Spots: userSpots });
});

// get information from spot by id
router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 });
  }

  const user = await User.findByPk(spot.ownerId);
  const spotImages = await SpotImage.findAll({
    where: { spotId: req.params.spotId },
    attributes: { exclude: ["spotId"] },
  });
  const reviews = await Review.findAll({
    where: { spotId: req.params.spotId },
  });
  let count = 0;
  let adder = reviews.forEach((review) => {
    count += review.stars;
  });
  let avg = count / reviews.length;

  const resObj = {
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    numReviews: reviews.length,
    avgStarRating: avg || "no ratings for this spot",
    Owner: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    SpotImages: spotImages,
  };

  res.json(resObj);
});

// create a spot
router.post("/", validateSpot, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  // res.status(201).json({ message: "Successfully created", newSpot: newSpot });
  res.status(201).json(newSpot);
});

// delete a spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    where: { ownerId: req.user.id },
  });
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 });
  }
  if (req.user.id !== spot.ownerId) {
    res.status(403).json({ message: "Forbidden", statusCode: 403 });
  }

  await spot.destroy();

  res.status(200).json({ message: "Successfully deleted", statusCode: 200 });
});

// get all reviews based on spot id
router.get("/:spotId/reviews", async (req, res) => {
  const spotReviews = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
        subQuery: false,
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
        subQuery: false,
      },
    ],
  });
  const spot = await Spot.findByPk(req.params.spotId);
  if (spot === null) {
    res.status(404).json({ message: "Spot could not be found", statusCode: 404 });
  }
  if (!spotReviews.length) {
    res.status(404).json({ message: "Spot does not have any reviews", statusCode: 404 });
  }

  res.json({Reviews: spotReviews});
});

//edit a spot only with authorized user
router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {
  try {
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

    let spot = await Spot.findByPk(req.params.spotId, {
      attributes: {
        exclude: ["previewImage"],
      },
    });
    if (req.user.id !== spot.ownerId) {
      res.status(401).json({ message: "Authentication required", statusCode: 401 });
    }
    spot.update({
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
    });

    await spot.save();
    res.json(spot);
  } catch (err) {
    res.status(404).json({ message: "Spot couldn't be found", statuscode: 404 });
  }
});

router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 });
  }

  const userId = req.user.id;
  const ownerId = spot.ownerId;

  const bookings = await Booking.findAll({
    where: {
      spotId: req.params.spotId,
    },
    include: {
      model: User,
    },
  });

  const response = [];

  bookings.forEach((booking) => {
    if (ownerId == userId) {
      response.push({
        id: booking.id,
        userId: booking.userId,
        spotId: booking.spotId,
        startDate: booking.startDate.toISOString().slice(0, 10),
        endDate: booking.endDate.toISOString().slice(0, 10),
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
        User: {
          id: booking.User.dataValues.id,
          firstName: booking.User.dataValues.firstName,
          lastName: booking.User.dataValues.lastName,
        },
      });
    } else if (ownerId != userId) {
      response.push({
        spotId: booking.spotId,
        startDate: booking.startDate.toISOString().slice(0, 10),
        endDate: booking.endDate.toISOString().slice(0, 10),
      });
    }
  });
  if (!response.length) {
    res
      .status(200)
      .json({ message: "Spot currently doesn't have any bookings", statusCode: 200 });
  }
  res.json({ Bookings: response });
});

//add an image to a spot based on spot id
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 });
  } else if (spot.ownerId != req.user.id) {
    res.status(403).json({ message: "Forbidden", statusCode: 403 });
  }
  const spotImage = await SpotImage.create({
    spotId: spot.id,
    url: url,
    preview: preview,
  });
  const resObj = {
    id: spotImage.id,
    url: spotImage.url,
    preview: spotImage.preview,
  };
  res.status(200).json(resObj);
});

// Create a Review for a Spot based on the Spot's id
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res) => {
    const { review, stars } = req.body;
    try {
      const spot = await Spot.findByPk(req.params.spotId, {
        include: {
          model: Review,
        },
      });
      if (!spot) {
        res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 });
      }

      let result;
      spot.Reviews.forEach((review) => {
        if (req.user.id == review.userId) {
          result = true;
        }
      });
      if (result) {
        return res.status(403).json({ message: "User already has a review for this spot", statusCode: 403 });
      } else {
        const createdReview = await Review.create({
          userId: req.user.id,
          spotId: spot.id,
          review: review,
          stars: stars,
        });
        res.status(201).json(createdReview);
      }
    } catch (err) {
      res.status(500).json({ message: "Server error", statusCode: 500 });
    }
  }
);

// Create a Booking from a Spot based on the Spot's id
router.post(
  "/:spotId/bookings",
  requireAuth,
  validateBooking,
  async (req, res) => {
    const { startDate, endDate } = req.body;
    const today = new Date();

    const spot = await Spot.findByPk(req.params.spotId);
    const spotBookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
    });

    let bookingDates = [];
    let momentStart = moment(startDate);
    let momentEnd = moment(endDate);
    while (momentStart.isBefore(momentEnd) || momentStart.isSame(momentEnd)) {
      bookingDates.push(moment(momentStart));
      momentStart.add(1, "days");
    }

    let currentBookings = [];
    spotBookings.forEach((spotBooking) => {
      let momentStart = moment(spotBooking.startDate);
      let momentEnd = moment(spotBooking.endDate);
      while (momentStart.isBefore(momentEnd) || momentStart.isSame(momentEnd)) {
        currentBookings.push(moment(momentStart));
        momentStart.add(1, "days");
      }
    });

    if (!spot) {
      res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 });
    } else if (spot.ownerId == req.user.id) {
      return res
        .status(403)
        .json({
          message: "Forbidden, Owner unable to make bookings on their spot",
        });
    } else if (moment(startDate).isBefore(moment(today))) {
      return res.status(400).json({ message: "Unable to make bookings in the past", statusCode: 400 });
    } else if (startDate >= endDate) {
      return res.status(400).json({
        message: "Validation error",
        statusCode: 400,
        errors: ["endDate cannot come before startDate"],
      });
    } else if (compareDates(bookingDates, currentBookings)) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        errors: [
          "Start date conflicts with an existing booking",
          "End date conflicts with an existing booking",
        ],
      });
    } else {
      const booking = await Booking.create({
        userId: req.user.id,
        spotId: spot.id,
        startDate: startDate,
        endDate: endDate,
      });
      const response = {
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: booking.startDate.toISOString().slice(0, 10),
        endDate: booking.endDate.toISOString().slice(0, 10),
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      };
      res.json(response);
    }
  }
);

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

module.exports = router;

// {
//   "id": 1,
//   "userId": 1,
//   "spotId": 1,
//   "startDate": "2023-02-25T07:00:00.000Z",
//   "endDate": "2023-03-04T07:00:00.000Z",
//   "createdAt": "2023-01-25T03:44:26.000Z",
//   "updatedAt": "2023-01-25T03:44:26.000Z"
// },
