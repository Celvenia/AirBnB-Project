// import { useEffect, useRef, useState} from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {
  // deleteASpot,
  getMySpots,
  getSpots,
  // updateASpot,
} from "../../store/spots";
import DeleteSpotModal from "../DeleteSpotModal";
import UpdateSpotModal from "../UpdateSpotModal";
import OpenModalMenuItem from "../Navigation/OpenMenuModalItem";

import SpotCard from "../SpotCard";
import "./SpotsManage.css";

const SpotsManage = () => {
  const spotsArray = useSelector((state) => state.spots?.Spots);
  const sessionUser = useSelector((state) => state?.session?.user)
  const spots = useSelector((state) => state.spots)
  const spotsArr = Object.values(spots).filter(spot => spot.ownerId === sessionUser.id)
  // console.log(spotsArr)
  // console.log(spotsArray)
  console.log(spots)
  // const firstImg = spotsArr

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpots());
    dispatch(getMySpots());

    return () => {};
  }, [dispatch]);

  if (!spotsArr) {
    return <div>Loading...</div>;
  }

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

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

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);
// return (
//   <h1>testing</h1>
// )

  return (
    <div className="spots_manage_container">
      <h1 className="spots_manage_h1 ">Manage Spots</h1>
      <div className="spot_cards">
        {spotsArray?.length &&
          spotsArray.map((spot) => (
            <div className="spot_card_container" key={spot.id}>
              <NavLink to={`/spots/${spot.id}`} className="nav_link">
                <SpotCard spot={spot} />
              </NavLink>

              <div className="spots_manage_buttons">
                <OpenModalMenuItem
                  itemText="Update"
                  onButtonClick={closeMenu}
                  modalComponent={<UpdateSpotModal spot={spot} />}
                />

                <OpenModalMenuItem
                  itemText="Delete"
                  modalComponent={<DeleteSpotModal spotId={spot.id} />}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  )



  // : (
  //   <h1 className="spots_manage_h1">
  //     Sorry it doesn't appear you have any listings...
  //   </h1>
  // );
};

export default SpotsManage;
