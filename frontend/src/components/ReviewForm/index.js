import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getSpotReviews, postAReview } from "../../store/reviews";
import "./ReviewForm.css";

const ReviewForm = ({ spotsId }) => {
  const dispatch = useDispatch();
  // const { spotId } = useParams();
  // const reviews = useSelector((state) => state?.reviews[spotsId]);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);
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
      .then(dispatch(getSpotReviews(spotsId)))
      .then(closeModal);
      return response
    } catch (err) {
      setErrors([{...err}]);
    }
  };

  useEffect(() => {
    setErrors([]);
    // dispatch(getSpotReviews(spotsId));
    return () => {};
  }, [dispatch, spotsId]);
  // },[dispatch])

  const handleStarClick1 = (e) => {
    e.preventDefault();
    setStars(1)
  }
  const handleStarClick2 = (e) => {
    e.preventDefault();
    setStars(2)
  }
  const handleStarClick3 = (e) => {
    e.preventDefault();
    setStars(3)
  }
  const handleStarClick4 = (e) => {
    e.preventDefault();
    setStars(4)
  }
  const handleStarClick5 = (e) => {
    e.preventDefault();
    setStars(5)
  }


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
      <form>
        <label>Review</label>
        <input
          type="textarea"
          placeholder="Leave your review here..."
          onChange={(e) => setReview(e.target.value)}
          required
        ></input>
        <label>Stars</label>

        <i onClick={handleStarClick1} className={stars >= 1 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
        <i onClick={handleStarClick2} className={stars >= 2 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
        <i onClick={handleStarClick3} className={stars >= 3 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
        <i onClick={handleStarClick4} className={stars >= 4 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
        <i onClick={handleStarClick5} className={stars >= 5 ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
        <button onClick={postReviewSubmit}>Submit Your Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
