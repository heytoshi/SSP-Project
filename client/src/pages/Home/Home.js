import React, { useState, useEffect } from "react";
import './Home.css';
import Layout from "../../components/Layout/Layout";
import TweetInput from "../../components/TweetInput/TweetInput";
import Tweet from "../../components/Tweet/Tweet";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const token = sessionStorage.getItem('token');
  
  const header =  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const fetchTweets = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/tweet/?page=${page}`, header);
      const data = response.data.data;
      if (data.length === 0) {
        setHasMore(false);
        return;
      }
      if(page === 1) {
        setTweets(data);
      } else {
        setTweets(prevTweets => [...prevTweets, ...data]);
      }
    } catch (error) {
    }
  };
  useEffect(() => {
    fetchTweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const refetchTweets = () => {
    fetchTweets() 
  };

  return (
    <Layout>
      <TweetInput refetchTweets={refetchTweets} />
      <InfiniteScroll
        dataLength={tweets.length}
        next={() => setPage(page => page + 1)}
        height={'100vh'}
        hasMore={hasMore} 
        loader={<h4>...</h4>}
      >
        {tweets.map((tweet, index) => (
          <Tweet
            key={index}
            tweet={tweet.tweet}
            username={tweet.username}
          />
        ))}
      </InfiniteScroll>
    </Layout>
  );
};

export default Home;
