import React from "react";
import "./Following.css";
import axios from "axios";

const Following = ({ username, unfollow, updateSearch }) => {
  const handleUnfollow = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const header = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const result = await axios.delete(
        `http://localhost:4000/follower/${username}`,
        header
      );
      if (result.data.success) {
        unfollow(username);
        updateSearch(true);
      }
    } catch (error) {
      console.error("Error unfollowing:", error);
    }
  };

  return (
    <div className="following-container">
      <div className="following-section">
        <img
          className="user-image"
          src="https://nailsbyjudy.gelmoment.com/static/default_theme/img/icons/icon-no-profile-pic.png"
          alt="User Profile"
        />
        <p className="following-username">@{username}</p>
      </div>
      <button className="following-button" onClick={handleUnfollow}>
        Unfollow
      </button>
    </div>
  );
};

export default Following;
