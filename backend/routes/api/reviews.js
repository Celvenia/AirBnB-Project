const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Review } = require("../../db/models");

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
router.delete('/:reviewId',requireAuth, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);
    try {
        if (!review) {
            res.status(403).json({message: "Review couldn't be found"})
        } else if (review.userId != req.user.id) {
            res.status(403).json({ message: "Forbidden" });
        } else {
            await review.destroy();
            res.status(200).json({message: "Successfully deleted"})
        }
    } catch (err) {
        return res.status(500).json({err: "A server error has occured"});
    }
})


module.exports = router;
