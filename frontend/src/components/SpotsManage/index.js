import { useEffect} from "react";
// import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
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
  const spotsArr = useSelector((state) => state.spots?.Spots);
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

  return (
    <div className="spots_manage_container">
      <h1 className="spots_manage_h1 ">Manage Spots</h1>
      <div className="spot_cards">
        {spotsArr.length &&
          spotsArr.map((spot) => (
            <div className="spot_card_container" key={spot.id}>
              <NavLink to={`/spots/${spot.id}`} className="nav_link">
                <SpotCard spot={spot} />
              </NavLink>

              <div className="spots_manage_buttons">
                <OpenModalMenuItem
                  itemText="Update"
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
