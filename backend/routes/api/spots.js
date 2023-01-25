const express = require("express");
const router = express.Router();

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
// const {sequelize} = require('sequelize')

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const booking = require("../../db/models/booking");

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

// get all spots
router.get("/", async (req, res) => {
  try {
    const spots = await Spot.findAll({
      attributes: [
        "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "description",
        "price",
        "createdAt",
        "updatedAt",
        "previewImage",
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
      ],
      include: [
        {
          model: Review,
          attributes: [],
        },
      ],
      group: ["Spot.id"],
    });
    res.json(spots);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// get information from spot by id
router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
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

  const obj = {
    Spot: {
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
      avgStarRating: avg,
    },
    Users: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    SpotImages: spotImages,
  };
  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found" });
  }

  res.json(obj);
});

// create a spot
router.post("/", validateSpot, async (req, res, next) => {
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
    res.status(201).json({ message: "Successfully created", data: newSpot });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// delete a spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    where: { ownerId: req.user.id },
  });
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }
  if (req.user.id !== spot.ownerId) {
    res.status(403).json({ message: "Forbidden" });
  }

  await spot.destroy();

  res.status(200).json({ message: "Successfully deleted" });
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
    res.status(404).json({ message: "Spot could not be found" });
  }
  if (!spotReviews.length) {
    res.status(404).json({ message: "Spot does not have any reviews" });
  }

  res.json(spotReviews);
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

    let spot = await Spot.findByPk(req.params.spotId);
    if (req.user.id !== spot.ownerId) {
      res.status(401).json({ message: "Authentication required" });
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
    res.status(404).json({ message: "Spot couldn't be found" });
  }
});

router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found" });
  }

  const userId = req.user.id;
  const ownerId = spot.ownerId;

  const bookings = await Booking.findAll({
    where: {
      spotId: req.params.spotId,
    },
  });

  const response = [];

  bookings.forEach((booking) => {
    if (ownerId == userId) {
      response.push({
        id: booking.id,
        userId: booking.userId,
        spotId: booking.spotId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      });
    } else if (ownerId != userId) {
      response.push({
        spotId: booking.spotId,
        startDate: booking.startDate,
        endDate: booking.endDate,
      });
    }
  });
  if (!response.length) {
    res
      .status(200)
      .json({ message: "Spot currently doesn't have any bookings" });
  }
  res.json({ Bookings: response });
});

router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found" });
  } else if (spot.ownerId != req.user.id) {
    res.status(403).json({ message: "Forbidden" });
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

module.exports = router;
