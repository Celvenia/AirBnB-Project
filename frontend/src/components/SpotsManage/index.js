import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteASpot, getMySpots, updateASpot } from "../../store/spots";
import DeleteSpotModal from "../DeleteSpotModal";
import UpdateSpotModal from "../UpdateSpotModal";
import OpenModalMenuItem from "../Navigation/OpenMenuModalItem";

import SpotCard from "../SpotCard";
import "./SpotsManage.css";

const SpotsManage = () => {
  const spotsObj = useSelector((state) => state.spots);
  const spotsArr = Object.values(spotsObj).flat();
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    dispatch(getMySpots());
    return () => {}
  }, [dispatch]);

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


  if (!spotsObj) {
    return <div>Loading...</div>;
  }


  return spotsArr.length ? (
    <>
      <h1>Manage Spots</h1>
      <main className="spot_cards">
        {spotsArr.length &&
          spotsArr.map((spot) => (
            <div className="spot_card_container" key={spot.id}>
              <NavLink to={`/spots/${spot.id}`} className="nav_link">
                <SpotCard spot={spot}/>
              </NavLink>
              {/* <button onClick={() => handleClickUpdate}>Update</button> */}
              {/* <button onClick={(e) => handleClickDelete(spot.id)}>Delete</button> */}
              <button>
                <OpenModalMenuItem
                  itemText="Update"
                  onButtonClick={closeMenu}
                  modalComponent={<UpdateSpotModal spot={spot}/>}
                />
              </button>
              <button>
                <OpenModalMenuItem
                  itemText="Delete"
                  onButtonClick={closeMenu}
                  modalComponent={<DeleteSpotModal spotId={spot.id}/>}
                />
              </button>
            </div>
          ))}
      </main>
    </>
  ) : (
    <h1>Sorry it doesn't appear you have any listings...</h1>
  );
};

export default SpotsManage;
