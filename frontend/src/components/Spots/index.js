import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import "./Spots.css";
// import * as sessionActions from "../../store/session";

const Spots = () => {
  const dispatch = useDispatch();
  const spotsObj = useSelector((state) => state.spots);
  const spotsArr = Object.values(spotsObj);

  useEffect(() => {
    dispatch(getSpots());
    return () => {};
  }, [dispatch]);

  if (!spotsArr.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="spots_container">
      <div className="spot_cards">
        {spotsArr.length &&
          spotsArr.map((spot) =>
            spot.id !== undefined ? (
              <div className="spot_card_container" key={spot.id}>
                <NavLink
                  to={`/spots/${spot.id}`}
                  className="nav_link"
                  key={spot.id}
                >
                  <SpotCard spot={spot} key={spot.id} />
                </NavLink>
              </div>
            ) : (
              ""
            )
          )}
      </div>
    </div>
  );
};

export default Spots;
