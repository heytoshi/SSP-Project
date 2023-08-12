const User = require("../models/user");

const follow = async (req, res) => {
  const username = req.body.token_data.username;
  const followUsername = req.body.username;

  const followers = await User.updateOne(
    { username: followUsername, "followers.username": { $ne: username } },
    { $addToSet: { followers: { username: username } } }
  );

  const following = await User.updateOne(
    { username: username, "following.username": { $ne: followUsername } },
    { $addToSet: { following: { username: followUsername } } }
  );

  if (following.modifiedCount === 0) throw new Error("Error following user");
  if (followers.modifiedCount === 0) throw new Error("Error following user");

  res.status(200).json({ success: true, data: following.modifiedCount });
};

const unfollow = async (req, res) => {
  const username = req.body.token_data.username;
  const unfollowUsername = req.params.username;

  await User.updateOne(
    { username: unfollowUsername },
    { $pull: { followers: { username: username } } }
  );

  await User.updateOne(
    { username: username },
    { $pull: { following: { username: unfollowUsername } } }
  );

  res.status(200).json({ success: true, data: 1 });
};

const getFollowers = async (req, res) => {
  const username = req.body.token_data.username;

  const page = req.query.page || 1;
  const limit = 10;
  const skip = (parseInt(page) - 1) * limit;

  const data = await User.findOne(
    { username: username },
    { followers: { $slice: [skip, limit] }, _id: 0 }
  );

  res.status(200).json({ success: true, data: data.followers });
};

const getFollowing = async (req, res) => {
  const username = req.body.token_data.username;
  const page = req.query.page || 1;
  const limit = 10;
  const skip = (parseInt(page) - 1) * limit;

  const data = await User.findOne(
    { username: username },
    { following: { $slice: [skip, limit] }, _id: 0 }
  );

  res.status(200).json({ success: true, data: data.following });
};

module.exports = { follow, unfollow, getFollowers, getFollowing };
