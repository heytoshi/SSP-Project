import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import "./Profile.css";
import Layout from "../../components/Layout/Layout";
import Follower from "../../components/Followers/Followers";
import Following from "../../components/Following/Following";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Search from "../../components/Search/Search";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("following");
  const [followingList, setFollowingList] = useState([]);
  const [followersList, setFollowersList] = useState([]);
  const [updateSearch, setUpdateSearch] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const contentRef = useRef(null);

  const resetInfiniteScroll = () => {
    setPage(1);
    setHasMore(true);
    setFollowingList([]);
    setFollowersList([]);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetInfiniteScroll();
  };

  const fetchFollowing = async () => {
    const token = sessionStorage.getItem("token");

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `http://localhost:4000/follower/following?page=${page}`,
        header
      );
      const data = response.data.data;
      if (data.length === 0) {
        setHasMore(false);
        return;
      }
      if (page === 1) {
        setFollowingList(data);
      } else {
        setFollowingList((prevList) => [...prevList, ...data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFollowers = async () => {
    const token = sessionStorage.getItem("token");

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `http://localhost:4000/follower/?page=${page}`,
        header
      );
      const data = response.data.data;
      if (data.length === 0) {
        setHasMore(false);
        return;
      }
      setFollowersList((prevList) => [...prevList, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoreData = () => {
    if (activeTab === "following") {
      setPage((prevPage) => prevPage + 1);
      fetchFollowing();
    } else if (activeTab === "followers") {
      setPage((prevPage) => prevPage + 1);
      fetchFollowers();
    }
  };

  useEffect(() => {
    resetInfiniteScroll();
    if (activeTab === "following") {
      fetchFollowing();
    } else if (activeTab === "followers") {
      fetchFollowers();
    }
  }, [activeTab]);

  useLayoutEffect(() => {
    const contentHeight = contentRef.current.clientHeight;
    if (contentHeight < window.innerHeight) {
      setPage(2);
    }
  }, []);

  const updateSearchFunction = (value) => {
    setUpdateSearch(value);
  };

  const unfollow = (username) => {
    setFollowingList((prevList) =>
      prevList.filter((user) => user.username !== username)
    );
  };

  const follow = (username) => {
    const newUser = { username: username };
    setFollowingList((prevList) => [newUser, ...prevList]);
  };

  return (
    <Layout>
      <div id="follower-main-content" className="follower-main-content">
        <Search
          unfollow={unfollow}
          follow={follow}
          updateSearch={updateSearch}
          setUpdateSearch={updateSearchFunction}
        ></Search>
        <div ref={contentRef}>
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
          <InfiniteScroll
            dataLength={
              activeTab === "following"
                ? followingList.length
                : followersList.length
            }
            next={fetchMoreData}
            hasMore={hasMore}
            scrollableTarget={"follower-main-content"}
          >
            {activeTab === "following"
              ? followingList.map((user, index) => (
                  <Following
                    key={index}
                    username={user.username}
                    unfollow={unfollow}
                    updateSearch={updateSearchFunction}
                  />
                ))
              : activeTab === "followers"
              ? followersList.map((user, index) => (
                  <Follower key={index} username={user.username} />
                ))
              : null}
          </InfiniteScroll>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
