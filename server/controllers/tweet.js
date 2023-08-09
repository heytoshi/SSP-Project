const User = require("../models/user");
const { Types } = require("mongoose");

const tweet = async (req, res) => {
  const tweet = req.body.tweet;
  const username = req.body.token_data.username;
  const tweetId = new Types.ObjectId();

  const result = await User.updateOne(
    { username: username },
    { $push: { tweets: { _id: tweetId, tweet: tweet } } }
  );

  if (result.modifiedCount === 0) throw new Error("Could not add tweet");
  res.status(200).json({ success: true, results: { id: tweetId.toString() } });
};

const get = async (req, res) => {
  const page = req.query.page || 1;
  const username = req.body.token_data.username;
  const limit = 10;
  const skip = (parseInt(page) - 1) * limit;

  const tweets = await User.aggregate([
    {
      $match: {
        $or: [{ username: username }, { "followers.username": username }],
      },
    },
    { $unwind: "$tweets" },
    { $sort: { "tweets.createdAt": -1 } },
    {
      $project: {
        _id: 0,
        username: 1,
        tweet: "$tweets.tweet",
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  res.status(200).json({ success: true, data: tweets });
};

module.exports = { tweet, get };
