const User = require("../models/user");


const validateFollowAndUnfollow = async (req, rest, next) => {
  const username = req.body.username;
  if (!username) throw new Error("Username is required");
  const user = await User.findOne({ username });
  if (!user) throw new Error("User does not exist");

  next();
};

module.exports = { validateFollowAndUnfollow };