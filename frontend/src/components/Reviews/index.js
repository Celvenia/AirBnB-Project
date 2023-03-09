import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAReview } from "../../store/reviews";

const Review = ({ review }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDeleteReviewClick = async (e) => {
    e.preventDefault();
    dispatch(deleteAReview(review.id)).then(closeModal);
  };

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
          // type="submit"
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
