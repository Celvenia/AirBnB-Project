import { useEffect, useRef, useState } from "react";
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
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  // const sessionUser = useSelector((state) => state.session.user.id)
  // console.log('sessionUser', sessionUser)

  useEffect(() => {
    dispatch(getASpot(spotId));
    return () => {};
  }, [dispatch, spotId]);

  // if (!spot || !spot.SpotImages || !spot.Owner) {
  //   return <div>Loading...</div>;
  // }

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

  const { firstName, lastName } = spot.Owner;
  const images = Object.values(spot.SpotImages);

  const handleClick = () => {
    alert("Feature coming soon...");
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  return (
    <main>
      <div className="body_container">
        <h1>{name}</h1>
        <div className="spot_detail_header">
          <span className="spot_detail_header_info">
            {/* star */}
            <span>
              <i className="fa-sharp fa-solid fa-star"></i> {avgStarRating}
            </span>
            {/* reviews */}
            <span>#reviews</span>
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
            {images.slice(1).map((image) => (
              <img src={image.url} alt="preview home" key={image.id} />
            ))}
          </span>
        </div>
        <div className="host">
          <div>
            <h2>
              Hosted by {firstName} {lastName}
            </h2>
            <div>
              <button>
                <OpenModalMenuItem
                  itemText="Update"
                  onButtonClick={closeMenu}
                  modalComponent={<UpdateSpotModal spot={spot} />}
                />
              </button>
              <button>
                <OpenModalMenuItem
                  itemText="Delete"
                  onButtonClick={closeMenu}
                  modalComponent={<DeleteSpotModal spotId={spot.id} />}
                />
              </button>
            </div>
          </div>

          <span className="reserve_container">
            <span className="reserve_info">
              <span className="reserve_text">
                <span className="price"> ${price} night, </span>
                <span className="rating">
                  <i className="fa-sharp fa-solid fa-star"></i>
                  {avgStarRating},
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
    </main>
  );
};

export default SpotDetails;
