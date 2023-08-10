// Profile.js
import React, { useState } from "react";
import "./Profile.css";
import Layout from "../../components/Layout/Layout";
import Follower from "../../components/Followers/Followers";
import Following from "../../components/Following/Following";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("following"); // Default active tab is "following"

  //const username = sessionStorage.getItem('username')

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout>
      <div className="button-group">
      <button
          className={`tab ${activeTab === "followers" ? "active" : ""}`}
          onClick={() => handleTabChange("followers")}
        >
          Followers
        </button>
        <button
          className={`tab ${activeTab === "following" ? "active" : ""}`}
          onClick={() => handleTabChange("following")}
        >
          Following
        </button>
      </div>
        {activeTab === "following" ? <Following /> : <Follower />}
    </Layout>
  );
};

export default Profile;
