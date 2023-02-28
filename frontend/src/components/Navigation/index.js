// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import AirbnbIcon from '../AirbnbIcon'
import './Navigation.css';
import Spots from '../Spots';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='header_navigation'>
        <NavLink exact to="/">
      <AirbnbIcon />
        </NavLink>
    <ul>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
      </div>
  );
}

export default Navigation;
