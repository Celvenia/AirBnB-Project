const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, ReviewImage, Booking } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const booking = require("../../db/models/booking");

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .not()
    .isEmail()
    .withMessage("Please provide a valid first name."),
  check("lastName")
    .exists({ checkFalsy: true })
    .not()
    .isEmail()
    .withMessage("Please provide a valid last name."),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// get all users
router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: Spot,
  });
  res.json(users);
});

//sign up
router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  await setTokenCookie(res, user);

  return res.json({
    user: user,
  });
});

router.get("/:userId/spots", async (req, res) => {
  const userSpots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
  });
  if (!userSpots) {
    res.status(404).json({ message: "User has no spots" });
  }
  res.json({ Spots: userSpots });
});

router.get("/current", requireAuth, async (req, res) => {
  try {
    if (res.user === null) {
      res.status(200).json(res.user);
    }
    const userObj = {
      user: {
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        username: req.user.username,
      },
    };
    res.json(userObj);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// get all reviews of current user
router.get("/:userId/reviews", requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: { userId: req.params.userId },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
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
          "price",
          "previewImage",
        ],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });
  if (req.params.userId != req.user.id) {
    return res.status(401).json({ message: "Authentication required" });
  }

  res.json({Reviews: reviews});
});


// get all bookings of current user
router.get('/:userId/bookings', async (req, res) => {
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ['description', 'createdAt', 'updatedAt']
        }
      }
    ]
  })
  res.json({Bookings: bookings})
})



module.exports = router;
