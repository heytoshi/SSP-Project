import React, { useRef } from "react";
import axios from "axios";
import "./TweetInput.css";

const TweetInput = ({ refetchTweets }) => {
  const tweetInputRef = useRef(null);

  const handleChange = () => {
    autoResize(tweetInputRef.current);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem("token");

    const tweetInputData = {
      tweet: tweetInputRef.current.value,
    };

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/tweet/",
        tweetInputData,
        header
      );
      if (response) {
        tweetInputRef.current.value = null;
        refetchTweets();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const autoResize = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <div className="tweet-input-container">
      <img
        className="user-image"
        src="https://nailsbyjudy.gelmoment.com/static/default_theme/img/icons/icon-no-profile-pic.png"
        alt="User Profile"
      />
      <form className="tweet-section" onSubmit={handleSubmit}>
        <textarea
          ref={tweetInputRef}
          id="tweet-input"
          className="tweet-input"
          onChange={handleChange}
          placeholder="What is happening?!"
        ></textarea>
        <hr className="horizontal-line" />
        <button type="submit" className="post-button">
          Post
        </button>
      </form>
    </div>
  );
};

export default TweetInput;
