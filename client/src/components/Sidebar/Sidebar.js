import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { AiFillHome, AiOutlineUser } from "react-icons/ai";

const Sidebar = () => {
  const username = sessionStorage.getItem("username");
  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-links">
        <Link className="link-sidebar" to="/home">
          <AiFillHome />
          Home
        </Link>
        <Link className="link-sidebar" to={`/${username}`}>
          <AiOutlineUser />
          Profile
        </Link>
      </div>
      <div className="username-container">
        <div className="username-info">
          <img
            className="user-image"
            src="https://nailsbyjudy.gelmoment.com/static/default_theme/img/icons/icon-no-profile-pic.png"
            alt="User Profile"
          />
          <p id="username">@{username}</p>
        </div>
        <button className="sign-out" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
