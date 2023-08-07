import React from 'react';
import './Sidebar.css'

const Sidebar = () => {
  const username = localStorage.getItem('username');
  return (
    <div className="sidebar">
      <ul>
        <li>Home</li>
        <li>Explore</li>
        <li>Notifications</li>
        <li>Messages</li>
      </ul>
      <div className="username-container">
        <img
          className="user-image"
          src="https://nailsbyjudy.gelmoment.com/static/default_theme/img/icons/icon-no-profile-pic.png"
          alt="User Profile"
        />
        <p id="username">@{username}</p>
      </div>
    </div>
  );
};

export default Sidebar;
