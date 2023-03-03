import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getASpot } from "../../store/spots";
import DeleteSpotModal from "../DeleteSpotModal";
import UpdateSpotModal from "../UpdateSpotModal";
import OpenModalMenuItem from "../Navigation/OpenMenuModalItem";

import "./SpotDetails.css";

const SpotDetails = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  let userId;

  if (sessionUser) {
    userId = sessionUser.id;
  }


  useEffect(() => {
    dispatch(getASpot(spotId));
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
    <div>
      <div className="body_container">
        <h1>{name}</h1>
        <div className="spot_detail_header">
          <span className="spot_detail_header_info">
            {/* star */}
            <span>
              <i className="fa-sharp fa-solid fa-star"></i> {numReviews !== 0 ? (avgStarRating % 1 === 0 ? avgStarRating.toFixed(1) : parseFloat(avgStarRating.toFixed(2))) : "New"}
            </span>
            {/* reviews */}
            <span>{numReviews} reviews</span>
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

            {userId === id ?
              (<>   <button>
                <OpenModalMenuItem
                  itemText="Update"
                  modalComponent={<UpdateSpotModal spot={spot}/>}
                />
              </button>
              <button>
                <OpenModalMenuItem
                  itemText="Delete"
                  modalComponent={<DeleteSpotModal spotId={spot.id}/>}
                />
              </button>
              </>) : ("")
            }
          </div>

          <span className="reserve_container">
            <span className="reserve_info">
              <span className="reserve_text">
                <span className="price"> ${price} night, </span>
                <span className="rating">
                  <i className="fa-sharp fa-solid fa-star"></i>
                  {numReviews !== 0 ? (avgStarRating % 1 === 0 ? avgStarRating.toFixed(1) : parseFloat(avgStarRating.toFixed(2))) : "New"},
                </span>
                <span>{numReviews} review(s)</span>
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
      </div>
    </div>
  );
};

export default SpotDetails;
