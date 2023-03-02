// frontend/src/components/Navigation/index.js
import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import AirbnbIcon from "../AirbnbIcon";
import "./Navigation.css";
import { getSpots } from "../../store/spots";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  // const spotsObj = useSelector((state) => state.spots);
  // const spotsArr = Object.values(spotsObj)

  const handleClick = () => {
    // dispatch(getSpots())
    history.push("/");
  };
  const handleCreateASpotClick = () => {
    if(!sessionUser) {
      alert("Please Log in to Create a Spot")
    } else {
      history.push('/spots/new')
    }
  }

  return (
    <div className="header_navigation">
      <div className="header_content">
        <div onClick={handleClick}>
          <AirbnbIcon />
        </div>
          <ul>
            {isLoaded && (
              <span className="header_right">
                  <span onClick={handleCreateASpotClick} className="header_create_spot">Create a New Spot</span>
              <li>
                <ProfileButton user={sessionUser} />
              </li>
              </span>
            )}
          </ul>
      </div>
    </div>
  );
}

export default Navigation;
