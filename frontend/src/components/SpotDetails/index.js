import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getASpot } from "../../store/spots";
import "./SpotDetails.css";

const SpotDetails = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user.id)
  // console.log('sessionUser', sessionUser)

  useEffect(() => {
    dispatch(getASpot(spotId));
    return () => {};
  }, [dispatch, spotId]);

  // if(!sessionUser) {
  //   return null;
  // }
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
  const { firstName, lastName } = spot.Owner;
  // console.log(spot);

  const handleClick = () => {
    // history.push("/");
    alert("Feature coming soon...");
  };

  return (
    <main>
      <div className="container">
        <h1>{name}</h1>
        <div className="spot_detail_header">
          <span className="spot_detail_header_info">
            <span>
              <i className="fa-sharp fa-solid fa-star"></i> {avgStarRating}
            </span>
            <span>#reviews</span>
            <span>
              {city}, {state}, {country}
            </span>
          </span>
          <span>
            Save <i className="fa-sharp fa-solid fa-heart"></i>
          </span>
        </div>
        <div className="image_container">
          {Object.values(spot.SpotImages).map((image) => (
            <img src={image.url} alt="preview home" key={image.id} />
          ))}
          {/* <img src={previewImage} alt='home preview' /> */}
        </div>
        <div className="host">
          <h2>
            Hosted by {firstName} {lastName}
          </h2>
          <div className="reserve_container">
            <span className="reserve_info">
              <span className="reserve_text">

              <span className='price'> ${price} night, </span>
              <span className='rating'>
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
          </div>
        </div>
        <article className="description">{description}</article>
      </div>
    </main>
  );
};

export default SpotDetails;
