// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import AirbnbIcon from '../AirbnbIcon'
import './Navigation.css';
import Spots from '../Spots';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  const handleClick = () => {
    history.push('/')
  }

  return (
    <div className='header_navigation'>
        <div onClick={handleClick}>
      <AirbnbIcon />
        </div>

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
