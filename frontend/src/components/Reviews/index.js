import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotReviews, postAReview } from "../../store/reviews";
import "./Reviews.css";

const Reviews = ({ spotsId }) => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const reviews = useSelector((state) => state.reviews[spotId]);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);

  const postReviewSubmit = async (e) => {
    // e.preventDefault();
    // const validationErrors = [];

    const reviewData = {
      review,
      stars,
    };
    let response;
    try {
      response = await dispatch(postAReview(spotsId, reviewData));
    } catch (err) {
      setErrors([...err.message]);
    }
  };

  useEffect(() => {
    setErrors([]);
    dispatch(getSpotReviews(spotsId));
    return () => {};
  }, [dispatch, spotsId]);

  return (
    <div className="reviews_container">
      <h2>How was your stay?</h2>
      <form>
        <label>Review</label>
        <input
          type="textarea"
          placeholder="Leave your review here..."
          onChange={(e) => setReview(e.target.value)}
          required
        ></input>
        <label>Stars</label>
        <input type="number" onChange={(e) => setStars(e.target.value)}></input>
        <button onClick={postReviewSubmit}>Submit Your Review</button>
      </form>
    </div>
  );
};

export default Reviews;
