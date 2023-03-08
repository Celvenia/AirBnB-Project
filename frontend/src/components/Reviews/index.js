import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteAReview, getSpotReviews } from "../../store/reviews";
import { getASpot } from "../../store/spots";

const Review = ({ review, spot }) => {
  const { spotId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  // const spot = useSelector((state) => state.spots[spotId]);
  const dispatch = useDispatch();

  const handleDeleteReviewClick = (e) => {
    e.preventDefault();
    // let response;
    // try {
      let response = dispatch(deleteAReview(review.id))
        // .then(await dispatch(getSpotReviews(review.spotId)))
        // .then(await dispatch(dispatch(getASpot(review.spotId))))
        if(response.ok) {
            return response;
        } else return
    // } catch (err) {
        // return err
    // }
  };

useEffect(() => {
  dispatch(getASpot(review.spotId))
  dispatch(getSpotReviews(review.spotId))
},[dispatch, review.spotId])
// },[dispatch, review.spotId])

  return (
    <>
      <li>
        #{review?.User?.firstName}
        {"  "}
        {review?.User?.lastName}
      </li>
      <li>{review?.updatedAt.slice(0, 10)}</li>
      <li>{review?.review}</li>
      {sessionUser?.id === review?.User?.id ? (
          <button
          type="submit"
          onClick={handleDeleteReviewClick}
          className="spot_details_review_delete"
          >
          Delete
        </button>
      ) : (
          ""
          )}
          </>
  );
};

export default Review;
