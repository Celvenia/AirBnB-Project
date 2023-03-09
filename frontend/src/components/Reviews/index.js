import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteAReview, getSpotReviews } from "../../store/reviews";
import { getASpot } from "../../store/spots";

const Review = ({ review, spot }) => {
  const { spotId } = useParams();

  const sessionUser = useSelector((state) => state.session.user);
  // const stateSpot = useSelector((state) => state.spots[spotId]);
  // const reviews = useSelector((state) => state.reviews?.spot?.id)
  // const [reviewLength, setReviewLength] = useState(null)
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  // setReviewLength(reviews?.length)
  const handleDeleteReviewClick = async (e) => {
    e.preventDefault();
    // let response;
    // try {
    let response = await dispatch(deleteAReview(review.id))
      .then(await dispatch(getSpotReviews(review.spotId)))
      .then(await dispatch(getASpot(review.spotId)))
      .then(closeModal);
    // if(response.ok) {
    //     return response;
    // } else return
    // } catch (err) {
    // return err
    // }
  };

  useEffect(() => {
    dispatch(getASpot(review.spotId));
    dispatch(getSpotReviews(review.spotId));
    // setReviewLength(reviews?.length)
    // console.log(reviewLength)
  }, [dispatch, review.spotId]);
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
