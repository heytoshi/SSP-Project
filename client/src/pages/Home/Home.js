import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./Home.css";
import Layout from "../../components/Layout/Layout";
import TweetInput from "../../components/TweetInput/TweetInput";
import Tweet from "../../components/Tweet/Tweet";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const contentRef = useRef(null);

  const token = sessionStorage.getItem("token");

  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchTweets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/tweet/?page=${page}`,
        header
      );
      const data = response.data.data;

      if (data.length === 0) {
        setHasMore(false);
        return;
      }
      setTweets((prevTweets) => [...prevTweets, ...data]);
    } catch (error) {}
  };
  
  useEffect(() => {
    fetchTweets(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useLayoutEffect(() => {
    const contentHeight = contentRef.current.clientHeight;
    if(contentHeight < window.innerHeight) {
      setPage(2)
    }
  }, []);

  const refetchTweets = (username, tweet) => {
    const newTweet = { username: username, tweet: tweet};
    setTweets((prevList) => [newTweet, ...prevList]);
  };


  return (
    <Layout>
      <div id="tweet-main-content" className="tweet-main-content">
        <div ref={contentRef}>
          <TweetInput refetchTweets={refetchTweets} />
          <InfiniteScroll
            dataLength={tweets.length}
            next={() => setPage((page) => page + 1)}
            hasMore={hasMore}
            loader={<h4>...</h4>}
            scrollableTarget={"tweet-main-content"}
          >
            {tweets.map((tweet, index) => (
              <Tweet
                key={index}
                tweet={tweet.tweet}
                username={tweet.username}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
