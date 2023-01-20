const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Spot,
  User,
  Review,
  SpotImage,
  ReviewImage,
  sequelize,
} = require("../../db/models");
// const sequelize = require('sequelize')

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .not()
    .withMessage("Street address is required"),

  check("city")
    .exists({ checkFalsy: true })
    .not()
    .withMessage("City is required"),

  check("state")
    .exists({ checkFalsy: true })
    .not()
    .withMessage("State is required"),

  check("country")
    .exists({ checkFalsy: true })
    .not()
    .withMessage("Country is required"),

  check("lat")
    .exists({ checkFalsy: true })
    .isDecimal()
    .not()
    .withMessage("Latitude is not valid"),

  check("lng")
    .exists({ checkFalsy: true })
    .isDecimal()
    .not()
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
  const spots = await Spot.findAll({
    // include: [{model: SpotImage}] - checking to see if spotImage data was associated correctly
  });
  res.json(spots);
});

// get information from spot by id
router.get("/:spotId", async (req, res) => {
  const spotToFind = req.params.spotId;
  const spot = await Spot.findByPk(spotToFind, {
    attributes: {
      include: [
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
        [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"],
      ],
    },

    include: [
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
        subQuery: false,
      },
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
        subQuery: false,
      },
      {
        model: Review,
        attributes: [],
        subQuery: false,
      },
    ],
    // group: [Spot.id]
  });

  if (spot.id === null) {
    res.status(404).json({ message: "Spot couldn't be found" });
  }

  res.json(spot);
});

// create a spot
router.post("/", validateSpot, async (req, res) => {
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
  res.status(201).json({ message: "Successfully created", data: newSpot });
});

// delete a spot
// router.delete("/:spotId", async (req, res) => {
//   const spot = await Spot.findOne({
//     where: { id: req.params.spotId, ownerId: req.user.id },
//   });
//   if (!spot) {
//     res
//       .status(404)
//       .json({ message: "Spot couldn't be found" });
//   }
//   await spot.destroy();
//   res.json({ message: "Successfully deleted" });
  // res.json(spot)
// });

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

module.exports = router;
