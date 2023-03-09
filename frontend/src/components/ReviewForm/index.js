import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getSpotReviews, postAReview } from "../../store/reviews";
import { getASpot } from "../../store/spots";
import "./ReviewForm.css";

const ReviewForm = ({ spotsId }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const { closeModal } = useModal();

  const postReviewSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      review,
      stars,
    };

    let response;

    try {
      response = await dispatch(postAReview(spotsId, reviewData))
        .then(await dispatch(getASpot(spotsId)))
        .then(await dispatch(getSpotReviews(spotsId)))
        .then(closeModal);
      // history.push(`/spots${spotsId}`)
      return response;
    } catch (err) {
      setErrors(err.message);
    }
  };

  useEffect(() => {
    setErrors([]);
    return () => {};
  }, [dispatch, spotsId]);

  useEffect(() => {
    dispatch(getASpot(spotsId));
    dispatch(getSpotReviews(spotsId));
  }, [dispatch, spotsId]);

  const handleStarClick1 = (e) => {
    e.preventDefault();
    setStars(1);
  };
  const handleStarClick2 = (e) => {
    e.preventDefault();
    setStars(2);
  };
  const handleStarClick3 = (e) => {
    e.preventDefault();
    setStars(3);
  };
  const handleStarClick4 = (e) => {
    e.preventDefault();
    setStars(4);
  };
  const handleStarClick5 = (e) => {
    e.preventDefault();
    setStars(5);
  };

  return (
    <div className="reviews_container">
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
