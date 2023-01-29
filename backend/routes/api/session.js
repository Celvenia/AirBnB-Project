const express = require('express')
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors, handleLoginErrors } = require('../../utils/validation');

const validateLogin = [
    check('credential').exists({ checkFalsy: true }).withMessage('Email or username is required'),
    check('credential').if(check('credential').exists()).not().isFloat().not().isEmpty().withMessage('Please provide a valid email or username.'),
    check('password').exists({ checkFalsy: true }).withMessage('Password is required'),
    check('password').if(check('password').exists()).not().isEmpty().withMessage('Please provide a password.'),
    handleLoginErrors
  ];

  // Log in
  router.post(
    '/',
    validateLogin,
    async (req, res, next) => {

        const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        res.json({
          message: "Invalid credentials",
          statusCode: 401
        })
          return next(err);
      }

      await setTokenCookie(res, user);

        return res.json({
          user: user
        });
  });

  // Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json(
          {user:user.toSafeObject()}
        );
      } else return res.json({ user: null });
    }
  );



  // if XSRF-Token isn't shown go here http://localhost:8000/api/csrf/restore

module.exports = router;


      //   let errResponse = {
      //     message: "Validation error",
      //     statusCode: 400,
      //     errors: []
      //   }
      //   if(!credential) {
      //     errResponse.errors.push("Email or username is required")
      // }
      // if(!password) {
      //   errResponse.errors.push("Password is required")
      // }
      // if(errResponse.errors.length) {
      //   return res.json(errResponse)
      // }

        //  const response = {
        //   id: user.id,
        //   firstName: user.firstName,
        //   lastName: user.lastName,
        //   email: user.email,
        //   username: user.username
        //  }
        // const token = req.cookies.token
