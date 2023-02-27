import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import "./Spots.css";

const Spots = () => {
  const dispatch = useDispatch();
  const spotsArr = useSelector((state) => Object.values(state.spots));

  // console.log(spotsArr)

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <main className="spot_cards">

      {spotsArr.length && spotsArr.map((spot) => (
        <div>{spot.id}</div>
        // <SpotCard  spot={spot} key={spot.id} />
    //    <SpotCard spot={spot} />
      ))}
    </main>
  );
};

export default Spots;
