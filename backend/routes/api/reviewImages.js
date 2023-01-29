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
  const reviewImages = await ReviewImage.findAll();
  res.json(reviewImages);
});

// delete review image by id, requires user to own review
router.delete("/:imageId", requireAuth, async (req, res) => {
  const reviewImage = await ReviewImage.findByPk(req.params.imageId);
  if (!reviewImage) {
    res.status(404).json({ message: "Review Image couldn't be found" });
  }

  const review = await Review.findOne({
    where: {
      id: reviewImage.reviewId,
    },
  });

  if (review.userId != req.user.id) {
    res.status(403).json({ message: "Forbidden", statusCode: 403 });
  } else {
    await reviewImage.destroy();
    res.status(200).json({ message: "Successfully deleted", statusCode: 200 });
  }
});

module.exports = router;
