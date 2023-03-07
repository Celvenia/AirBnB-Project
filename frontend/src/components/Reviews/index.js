import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotReviews, postAReview } from "../../store/reviews";
import "./Reviews.css";

const Reviews = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const reviews = useSelector((state) => state.reviews[spotId]);
  const [review, setReview] = useState("this is awesome");
  const [stars, setStars] = useState(5);
  const [errors, setErrors] = useState([]);

  // setReview("this is awesome")
  // setStars(5)


  console.log('testing this!!!!!!', reviews)

  const postReviewClick = async (e) => {
    // e.preventDefault()
    // const validationErrors = [];


    const reviewData = {
      review,
      stars,
    };
    let response;

    try {
      console.log('what is this number', spotId)
      response = await dispatch(postAReview(spotId, reviewData));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(getSpotReviews(spotId));
    return () => {};
  }, [dispatch, spotId]);

//   return myReview ? (
    return (
    <div>
      <button onClick={postReviewClick}>Post Review</button>
      {/* <div>User: {myReview.userId}</div> */}
      {/* <div>Review: {myReview.review}</div> */}
    </div>
  )
//   : (
//     <h1>something went wrong</h1>
//   );
};

export default Reviews;
