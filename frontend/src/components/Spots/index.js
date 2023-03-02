import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import "./Spots.css";
import * as sessionActions from "../../store/session";

const Spots = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector((state) => state.spots);
  const spotsArr = Object.values(spotsObj)

  // console.log(spotsArr);

  useEffect(() => {
    dispatch(getSpots());
    return () => {};
  }, []);

  if (!spotsArr.length) {
    return <div>Loading...</div>;
  }

  return (
    <main className="spot_cards">
      {spotsArr.length &&
        spotsArr.map((spot) => spot.id !== undefined ? (
          <div className="spot_card_container" key={spot.id}>
            <NavLink to={`/spots/${spot.id}`} className="nav_link" key={spot.id}>
              <SpotCard spot={spot} key={spot.id}/>
            </NavLink>
          </div>
        ): "")}
    </main>
  );
};

export default Spots;

// let uniqueSpotsSet = new Set();
// spotsArr.forEach(spot => {
//   uniqueSpotsSet.add(spot)
// })
// let uniqueSpotsArr = Array.from(uniqueSpotsSet);
