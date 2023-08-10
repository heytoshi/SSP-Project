import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import './Sidebar.css';

const Sidebar = () => {
  const username = localStorage.getItem('username');
  return (
    <div className="sidebar">
      <ul>
        <Link className='link-sidebar' to="/home">Home</Link>
      </ul>
      <Link to={`/${username}`} className="username-container">
        <img
          className="user-image"
          src="https://nailsbyjudy.gelmoment.com/static/default_theme/img/icons/icon-no-profile-pic.png"
          alt="User Profile"
        />
        <p className='link-sidebar' id="username">@{username}</p>
      </Link>
    </div>
  );
};

export default Sidebar;
