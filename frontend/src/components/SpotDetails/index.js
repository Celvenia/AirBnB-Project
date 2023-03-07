import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getASpot } from "../../store/spots";
import DeleteSpotModal from "../DeleteSpotModal";
import UpdateSpotModal from "../UpdateSpotModal";
import OpenModalMenuItem from "../Navigation/OpenMenuModalItem";

import "./SpotDetails.css";
import Reviews from "../Reviews";
import { getSpotReviews } from "../../store/reviews";

const SpotDetails = () => {
  const { spotId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spots[spotId]);
  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  let userId;

  if (sessionUser) {
    userId = sessionUser.id;
  }

  useEffect(() => {
    dispatch(getASpot(spotId))
    dispatch(getSpotReviews(spotId))
    return () => {};
  }, [dispatch, spotId]);

  if (!spot || !spot.SpotImages || !spot.Owner) {
    return <div>Loading...</div>;
  }

  const {
    city,
    state,
    country,
    name,
    avgStarRating,
    description,
    price,
    numReviews,
  } = spot;

  const { firstName, lastName, id } = spot.Owner;
  const images = Object.values(spot.SpotImages);

  const handleClick = () => {
    alert("Feature coming soon...");
  };
  return (
    // <div>
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
          <span className="image_first">
            {images.length ? (
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

            {userId === id ? (
              <>
                {" "}
                <span className="spot_detail_update_modal_button">
                  <OpenModalMenuItem
                    itemText="Update Spot"
                    modalComponent={
                      <UpdateSpotModal
                        spotImages={spot.SpotImages}
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
            ) : (
              ""
            )}
          </div>

          <span className="reserve_container">
            <span className="reserve_info">
              <span className="reserve_text">
                <span className="price"> ${price} night, </span>
                <span className="rating">
                  <i className="fa-sharp fa-solid fa-star"></i>
                  {numReviews !== 0
                    ? avgStarRating % 1 === 0
                      ? avgStarRating.toFixed(1)
                      : parseFloat(avgStarRating.toFixed(2))
                    : "New"}
                  ,
                </span>
                <span>
                  {numReviews} {numReviews !== 1 ? "Reviews" : "Review"}
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
            {numReviews !== 0
              ? avgStarRating % 1 === 0
                ? avgStarRating.toFixed(1)
                : parseFloat(avgStarRating.toFixed(2))
              : "New"}
          </span>
          <span className="spot_detail_review_items">{" * "} </span>
          {/* reviews */}
          <span className="spot_detail_review_items">
            {numReviews} {numReviews !== 1 ? "Reviews" : "Review"}
          </span>
        </div>
        {numReviews === 0 ? (
          <OpenModalMenuItem
            itemText="Be the first to add a review"
            modalComponent={<Reviews spotsId={spotId} />}
          />
        ) : userId === undefined ? "" : userId === spot.Owner.id ? "" : (
          <OpenModalMenuItem
            itemText={"Post a Review"}
            modalComponent={<Reviews spotsId={spotId} />}
          />
        )}
      </div>
    // </div>
  );
};

export default SpotDetails;
