const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('firstName')
    .exists({ checkFalsy: true })
    .not()
    .isEmail()
    .withMessage('Please provide a valid first name.'),
    check('lastName')
    .exists({ checkFalsy: true })
    .not()
    .isEmail()
    .withMessage('Please provide a valid last name.'),
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

  // get all users
  router.get('/', async (req, res) => {
    const users = await User.findAll({
      // include: Spot
    })
    res.json(users)
  })

  //sign up
  router.post('/', validateSignup, async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;
      const user = await User.signup({ firstName, lastName, email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user: user
      });
    });

  //log
  // router.post('/login', async (req, res) => {
  //   const {username, password} = req.body
  //   const user = await User.findOne({
  //     where: {
  //       username,
  //       password
  //     }
  //   })
  //   if(!user) {
  //     return res.status(404).json({message: "User can't be found with that username and password"})
  //   }
  //   res.json({message: "Successfully logged in"})

  // })

module.exports = router;
