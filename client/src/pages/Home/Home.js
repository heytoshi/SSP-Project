import React from "react";
import './Home.css';
import Layout from "../../components/Layout/Layout";
import TweetInput from "../../components/TweetInput/TweetInput";

const Home = () => {
  return (
    <Layout>
        <TweetInput/>
    </Layout>
  );
};

export default Home;
