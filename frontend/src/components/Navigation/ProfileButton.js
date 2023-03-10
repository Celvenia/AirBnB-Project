// frontend/src/components/Navigation/ProfileButton.js
// import OpenModalButton from "../OpenModalButton";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalMenuItem from "./OpenMenuModalItem";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const handleClick = () => {
    closeMenu();
    history.push("/spots/current");
  };

  return (
    <div>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>
              {"Hello, "} {user.firstName}
            </li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
            <li className="manage_spots" onClick={handleClick}>
              Manage Spots
            </li>
          </>
        ) : (
            <ul>
              <div className="user buttons">
                <OpenModalMenuItem
                  itemText="Log In"
                  onButtonClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
              <div  className="user buttons">
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onButtonClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
            </ul>

        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
