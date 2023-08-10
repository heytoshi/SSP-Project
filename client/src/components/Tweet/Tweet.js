import React from "react";
import "./Tweet.css";

const Tweet = ({username, tweet}) => {
  return (
    <div className="tweet-container">
      <img
        className="user-image"
        src="https://nailsbyjudy.gelmoment.com/static/default_theme/img/icons/icon-no-profile-pic.png"
        alt="User Profile"
      />
      <div className="tweet-section">
        <p className="tweet-username">{username}</p>
        <p className="tweet-content">{tweet}</p>
      </div>
    </div>
  );
};

export default Tweet;
