const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, ReviewImage, Booking } = require("../../db/models");

const { check, cookie } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const booking = require("../../db/models/booking");

const { Sequelize, Op } = require("sequelize");

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
    check("firstName").not().isEmail().withMessage("firstName cannot be an email."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
    check("lastName").not().isEmail().withMessage("lastName cannot be an email."),
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

// Sign Up a User
router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  if(!firstName) {
    res.status
  }

  const currentUsers = await User.findAll({
    attributes: {
      include: ["email", "username"],
    },
  });
  currentUsers.forEach((user) => {
    if (user.email == email) {
      return res.status(403).json({
        message: "User already exists",
        statusCode: 403,
        errors: {
          email: "User with that email already exists",
        },
      });
    } else if (user.username == username) {
      return res.status(403).json({
        message: "User already exists",
        statusCode: 403,
        errors: {
          email: "User with that username already exists",
        },
      });
    }
  });
  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  await setTokenCookie(res, user);

  // let resObj = {
  //   id: user.id,
  //   firstName: user.firstName,
  //   lastName: user.lastName,
  //   email: user.email,
  //   username: user.username,
  //   token: token
  // }
  // return res.json(user);
  return res.json(user)
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




module.exports = router;
