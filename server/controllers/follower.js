const User = require("../models/user");

const follow = async (req, res) => {
  const username = req.body.token_data.username;
  const followUsername = req.body.username;

  const followers = await User.updateOne(
    { username: followUsername },
    { $addToSet: { followers: { username: username } } }
  );

  const following = await User.updateOne(
    { username: username },
    { $addToSet: { following: { username: followUsername } } }
  );

  if (following.modifiedCount === 0) throw new Error("Error following user");
  if (followers.modifiedCount === 0) throw new Error("Error following user");

  res.status(200).json({ success: true, data: following.modifiedCount });
};

const unfollow = async (req, res) => {
  const username = req.body.token_data.username;
  const unfollowUsername = req.params.username;

  const followers = await User.updateOne(
    { username: unfollowUsername },
    { $pull: { followers: { username: username } } }
  );

  const unfollowing = await User.updateOne(
    { username: username },
    { $pull: { following: { username: unfollowUsername } } }
  );

  if (unfollowing.modifiedCount === 0)
    throw new Error("Error unfollowing user");
  if (followers.modifiedCount === 0) throw new Error("Error unfollowing user");

  res.status(200).json({ success: true, data: unfollowing.modifiedCount });
};

module.exports = { follow, unfollow };
