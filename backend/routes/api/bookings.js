const express = require("express");
const router = express.Router();

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

module.exports = router;
