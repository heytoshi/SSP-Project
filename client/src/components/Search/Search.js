import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Search.css";

function Search({ unfollow, follow, updateSearch, setUpdateSearch }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    if (updateSearch) {
      handleInputChange({ target: { value: query } });
      setUpdateSearch(false);
    }
  }, [updateSearch]);

  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleInputChange = async (event) => {
    const query = event.target.value;
    setQuery(query);

    if (query.trim() !== "") {
      try {
        const response = await axios.get(
          `http://localhost:4000/user/?query=${query}`,
          header
        );
        const data = response.data.data;
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleFollow = async (username) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/follower/",
        { username: username },
        header
      );
      if (response.data.success) {
        handleInputChange({ target: { value: query } });
        follow(username);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (username) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/follower/${username}`,
        header
      );
      if (response.data.success) {
        handleInputChange({ target: { value: query } });
        unfollow(username);
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="search-input"
        placeholder="Search for a user..."
      />
      <hr className="search-horizontal-line" />
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((result, index) => (
            <div key={index} className="search-result-item">
              <div className="search-result-section">
                <img
                  className="user-image"
                  src="https://nailsbyjudy.gelmoment.com/static/default_theme/img/icons/icon-no-profile-pic.png"
                  alt="User Profile"
                />
                @{result.username}{" "}
              </div>
              {result.username === username ? null : (
                <div>
                  {result.following === 1 ? (
                    <button
                      className="search-unfollow-button"
                      onClick={() => handleUnfollow(result.username)}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="search-follow-button"
                      onClick={() => handleFollow(result.username)}
                    >
                      Follow
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
