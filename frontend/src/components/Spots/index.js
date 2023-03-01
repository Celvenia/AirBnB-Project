import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import "./Spots.css";

const Spots = () => {
  const dispatch = useDispatch();
  const spotsArr = useSelector((state) => Object.values(state.spots));

  // console.log(spotsArr);

  useEffect(() => {
    dispatch(getSpots());
    return () => {};
  }, [dispatch]);

  if (!spotsArr.length) {
    return <div>Loading...</div>;
  }

  return (
    <main className="spot_cards">
      {spotsArr.length &&
        spotsArr.map((spot) => (
          <div className="spot_card_container" key={spot.id}>
            <NavLink to={`/spots/${spot.id}`} className="nav_link">
              <SpotCard spot={spot} />
            </NavLink>
          </div>
        ))}
    </main>
  );
};

export default Spots;
