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

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Sequelize, Op } = require("sequelize");


router.get("/", async (req, res) => {
    const spotImages = await SpotImage.findAll();
    res.json(spotImages);
  });

  // delete spot image by id, requires user to own review
router.delete("/:imageId", requireAuth, async (req, res) => {
    const spotImage = await SpotImage.findByPk(req.params.imageId);
    if (!spotImage) {
      res.status(404).json({ message: "Spot Image couldn't be found" });
    }

    const spot = await Spot.findOne({
      where: {
        id: spotImage.spotId,
      },
    });

    if (spot.ownerId != req.user.id) {
      res.status(403).json({ message: "Forbidden" });
    } else {
      await spotImage.destroy();
      res.status(200).json({ message: "Successfully deleted" });
    }
  });

  module.exports = router;
