import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
// import SpotCard from "../SpotCard";
import "./Spots.css";

const Spots = () => {
  const dispatch = useDispatch();
  const spotsArr = useSelector((state) => Object.values(state.spots));

  // console.log(spotsArr)

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  if(!spotsArr.length) {
    return <div>Loading...</div>
  }

  return (
    <main className="spot_cards">
      {spotsArr.map((spot) => (
        // <SpotCard  spot={spot} key={spot.id} />
        <div className="spot_card" key={spot.id}>
          <img
            src="https://wallpapercave.com/wp/wp7113919.jpg"
            alt="home_image"
          />
          <div className="spot_card_text">
            {spot.city}, {spot.state}
            <br />
            miles away
            <br />
            ${spot.price}
          </div>
        </div>
      ))}
    </main>
  );
};

/* return (
 <main className="spot_cards">

      {spotsArr.length ? spotsArr.forEach((spot) => (
        <SpotCard  spot={spot} key={spot.id} />
       )) : <div>Loading...</div>}

     </main>
   ); */

export default Spots;
