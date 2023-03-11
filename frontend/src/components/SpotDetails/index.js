import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotReviews } from "../../store/reviews";
import { getASpot } from "../../store/spots";
import DeleteSpotModal from "../DeleteSpotModal";
import UpdateSpotModal from "../UpdateSpotModal";
import OpenModalMenuItem from "../Navigation/OpenMenuModalItem";
import ReviewForm from "../ReviewForm";
import Review from "../Reviews";
import "./SpotDetails.css";

const SpotDetails = () => {
  const { spotId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots?.[spotId]);
  const reviewsState = useSelector((state) => state.reviews);
  const currentSpotReviewsArr = Object.values(reviewsState).filter(
    (review) => review?.spotId === spot?.id
  );
  const newReviews = currentSpotReviewsArr.reverse();
  const usersReviewObj = currentSpotReviewsArr.find(
    (review) => review.userId === sessionUser?.id
  );
  const [reviewAmount, setReviewAmount] = useState();
  // const [newReviews, setNewReviews] = useState([]);
  // const [errors, setErrors] = useState()

  const dispatch = useDispatch();

  let userId;
  if (sessionUser) {
    userId = sessionUser.id;
  }

  useEffect(() => {
    dispatch(getASpot(spotId));
    dispatch(getSpotReviews(spotId));
    setReviewAmount(newReviews.length);
    return () => {};
  }, [dispatch, spotId, newReviews.length]);

  useEffect(() => {
    return () => {};
  }, [reviewsState]);

  if (!spot || !spot.SpotImages || !spot.Owner) {
    return <div>Loading...</div>;
  }

  // destructured spot, DRY code
  const { city, state, country, name, avgStarRating, description, price } =
    spot;

  const { firstName, lastName, id } = spot.Owner;
  const images = Object.values(spot.SpotImages);

  const handleClick = () => {
    alert("Feature coming soon...");
  };

  return (
    spot && (
      <div className="body_container">
        <h1>{name}</h1>
        <div className="spot_detail_header">
          <span className="spot_detail_header_info">
            {/* location */}
            <span>
              {city}, {state}, {country}
            </span>
          </span>
          <span>
            Save <i className="fa-sharp fa-solid fa-heart"></i>
          </span>
        </div>
        <div className="image_container">
          <span
            className={images?.length > 1 ? "image_first" : "image_first_alt"}
          >
            {images?.length ? (
              <img src={images[0].url} alt="preview home" />
            ) : (
              "No Preview Image"
            )}
          </span>
          <span className="images_after_first">
            {images.slice(1, 5).map((image) => (
              <img src={image.url} alt="preview home" key={image.id} />
            ))}
          </span>
        </div>
        <div className="host">
          <div>
            <h2>
              Hosted by {firstName} {lastName}
            </h2>

            {userId === id && (
              <>
                <span className="spot_detail_update_modal_button">
                  <OpenModalMenuItem
                    itemText="Update Spot"
                    modalComponent={
                      <UpdateSpotModal
                        spot={spot}
                      />
                    }
                  />
                </span>
                <span>
                  <OpenModalMenuItem
                    itemText="Delete Spot"
                    modalComponent={<DeleteSpotModal spotId={spot.id} />}
                  />
                </span>
              </>
            )}
          </div>

          <span className="reserve_container">
            <span className="reserve_info">
              <span className="reserve_text">
                <span> ${price} night, </span>
                <span>
                  <i className="fa-sharp fa-solid fa-star"></i>
                  {reviewAmount !== 0
                    ? avgStarRating % 1 === 0
                      ? avgStarRating.toFixed(1)
                      : parseFloat(avgStarRating.toFixed(2))
                    : "New"}
                  ,
                </span>
                <span className="random">
                  {reviewAmount} {reviewAmount !== 1 ? "Reviews" : "Review"}
                </span>
              </span>
            </span>
            <span>
              <button onClick={handleClick} className="reserve_button">
                Reserve
              </button>
            </span>
          </span>
        </div>
        <h2>About this place</h2>
        <article className="description">{description}</article>
        <div className="spot_detail_review_info">
          {/* star */}
          <span className="spot_detail_review_items">
            <i className="fa-sharp fa-solid fa-star"></i>{" "}
            {reviewAmount !== 0
              ? avgStarRating % 1 === 0
                ? avgStarRating.toFixed(1)
                : parseFloat(avgStarRating.toFixed(2))
              : "New"}
          </span>
          <span
            className={
              reviewAmount === 0
                ? "spot_detail_hidden"
                : "spot_detail_review_items"
            }
          >
            {" · "}{" "}
          </span>
          {/* reviews */}
          <span
            className={
              reviewAmount === 0
                ? "spot_detail_hidden"
                : "spot_detail_review_items"
            }
          >
            {reviewAmount} {reviewAmount !== 1 ? "Reviews" : "Review"}
          </span>
        </div>
        {reviewAmount === 0 ? (
          !sessionUser || userId === spot.Owner.id ? (
            ""
          ) : (
            <OpenModalMenuItem
              itemText="Be the first to add a review"
              modalComponent={<ReviewForm spotsId={spotId} />}
            />
          )
        ) : userId === undefined ? (
          ""
        ) : userId === spot.Owner.id ? (
          ""
        ) : // ) : reviews && reviews.some((review) => review.userId === userId) ? (
        usersReviewObj ? (
          ""
        ) : (
          <OpenModalMenuItem
            itemText={"Post a Review"}
            modalComponent={<ReviewForm spotsId={spotId} />}
          />
        )}
        <div>
          {newReviews.map((review) => {
            return (
              <ul className="spot_details_review" key={review.id}>
                <Review review={review} spot={spot} />
              </ul>
            );
          })}
        </div>
      </div>
    )
  );
};

export default SpotDetails;
