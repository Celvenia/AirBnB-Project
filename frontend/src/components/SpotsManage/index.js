import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMySpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import "./SpotsManage.css";

const SpotsManage = () => {
    // const spotsArr = useSelector((state) => Object.values(state.spots));
    const spotsObj = useSelector((state) => state.spots);
    const spotsArr = Object.values(spotsObj)
    const mySpots = spotsArr[spotsArr.length-1]
    console.log('spotsArr test', mySpots)



  const dispatch = useDispatch();
  //    const sessionUser = useSelector((state) => state.session.user);
  //    const ownerId = sessionUser.id
  //    const handleClick = () => {
  //    }

  useEffect(() => {
    dispatch(getMySpots());
  }, [dispatch]);


  if (!spotsArr.length) {
    return <div>Loading...</div>;
  }
// https://res.cloudinary.com/dtzv3fsas/image/upload/v1677693679/49a7cbc0-bb86-4e1e-8454-a2c092d28321_wnrflo.jpg
//   console.log('testing', spotsArr)
    // const spotsArr = Object?.values(spots)

//   console.log(spotsArr);
  return (
    <>
      <h1>Manage Spots</h1>
      <main className="spot_cards">
        {mySpots.length &&
          mySpots.map((spot) => (
            <div className="spot_card_container" key={spot.id}>
              <NavLink to={`/spots/${spot.id}`} className="nav_link">
                <SpotCard spot={spot} />
              </NavLink>
            </div>
          ))}
      </main>
    </>
  );
};

export default SpotsManage;
