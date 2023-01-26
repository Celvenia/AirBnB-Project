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

router.get("/", async (req, res) => {
  const reviews = await Review.findAll();
  // console.log(reviews)
  res.json(reviews);
});

// edit a review, require authentication and authorization
router.put("/:reviewId", requireAuth, validateReview, async (req, res) => {
  const { review, stars } = req.body;
  const reviewToEdit = await Review.findByPk(req.params.reviewId, {
    where: {
      userId: req.user.id,
    },
  });
  if (!reviewToEdit) {
    res.status(404).json({ message: "Review couldn't be found" });
  } else if (reviewToEdit.userId != req.user.id) {
    res.status(403).json({ message: "Forbidden" });
  } else {
    reviewToEdit.update({
      review: review,
      stars: stars,
    });
    await reviewToEdit.save();
  }
  return res.json(reviewToEdit);
});

// delete a review, require authentication and authorization
router.delete("/:reviewId", requireAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);
  try {
    if (!review) {
      res.status(403).json({ message: "Review couldn't be found" });
    } else if (review.userId != req.user.id) {
      res.status(403).json({ message: "Forbidden" });
    } else {
      await review.destroy();
      res.status(200).json({ message: "Successfully deleted" });
    }
  } catch (err) {
    return res.status(500).json({ err: "A server error has occured" });
  }
});

// add an image to a review
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const { url } = req.body;
  const review = await Review.findByPk(req.params.reviewId);
  const reviewImages = await ReviewImage.findAll({
    where: {
      reviewId: review.id,
    },
  });
  if (!review) {
    res.status(404).json({ message: "Review couldn't be found" });
  } else if (review.userId != req.user.id) {
    res.status(403).json({ message: "Forbidden" });
  } else if (reviewImages.length >= 11) {
    res.status(403).json({
      message: "Maximum number of images for this resource was reached",
    });
  } else {
    const reviewImage = await ReviewImage.create({
      reviewId: review.id,
      url: url,
    });
    let resObj = {
      id: reviewImage.id,
      url: reviewImage.url,
    };
    res.json(resObj);
  }
});

// get all reviews of current user
router.get("/current", requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: { userId: req.user.id },
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
  // if (req.params.userId != req.user.id) {
  //   return res.status(401).json({ message: "Authentication required" });
  // }

  res.json({ Reviews: reviews });
});

module.exports = router;
