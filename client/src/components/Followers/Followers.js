import React from "react";
import "./Followers.css";

const Follower = ({username}) => {
  return (
    <div className="follower-container">
      <div className="follower-section">
        <img
          className="user-image"
          src="https://nailsbyjudy.gelmoment.com/static/default_theme/img/icons/icon-no-profile-pic.png"
          alt="User Profile"
        />
        <p className="follower-username">@{username}</p>
      </div>
    </div>
  );
};

export default Follower;
