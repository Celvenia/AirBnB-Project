import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { postAReview } from "../../store/reviews";
import "./ReviewForm.css";

const ReviewForm = ({ spotsId }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const contentRef = useRef();

  const postReviewSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = [];

    const reviewData = {
      review,
      stars,
    };

    if (review.length < 10) validationErrors.push("Review should be at least 10 characters");
    if (stars <= 0)
      validationErrors.push("Stars must be an integer between 1 and 5");

    setErrors(validationErrors);

    if (validationErrors.length) {
      contentRef.current.scrollTop = 0;
      return;
    }

    let response;

    try {
      response = await dispatch(postAReview(reviewData, spotsId)).then(
        closeModal
      );
      return response;
    } catch (err) {
      setErrors(err.message);
    }
  };

  const handleStarClick1 = (e) => {
    setStars(1);
  };
  const handleStarClick2 = (e) => {
    setStars(2);
  };
  const handleStarClick3 = (e) => {
    setStars(3);
  };
  const handleStarClick4 = (e) => {
    setStars(4);
  };
  const handleStarClick5 = (e) => {
    setStars(5);
  };

  return (
    <div className="reviews_container" ref={contentRef}>
      <h2>How was your stay?</h2>
      <ul>
        {errors.length ? <h3>Errors</h3> : ""}
        <div className="errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div>
      </ul>
      <form className="reviews_modal_form">
        <label>Review</label>
        <input
          className="review_input"
          type="textarea"
          placeholder="Leave your review here..."
          onChange={(e) => setReview(e.target.value)}
          required
        ></input>
        <div className="stars">
          <label>Stars</label>

          <i
            onClick={handleStarClick1}
            className={stars >= 1 ? "fa-solid fa-star" : "fa-regular fa-star"}
          ></i>
          <i
            onClick={handleStarClick2}
            className={stars >= 2 ? "fa-solid fa-star" : "fa-regular fa-star"}
          ></i>
          <i
            onClick={handleStarClick3}
            className={stars >= 3 ? "fa-solid fa-star" : "fa-regular fa-star"}
          ></i>
          <i
            onClick={handleStarClick4}
            className={stars >= 4 ? "fa-solid fa-star" : "fa-regular fa-star"}
          ></i>
          <i
            onClick={handleStarClick5}
            className={stars >= 5 ? "fa-solid fa-star" : "fa-regular fa-star"}
          ></i>
        </div>
        <button
          className="review_form_submit_button"
          onClick={postReviewSubmit}
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
