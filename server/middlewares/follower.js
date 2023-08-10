const User = require("../models/user");


const validateUnfollow = async (req, rest, next) => {
  const username = req.params.username;
  if (!username) throw new Error("Username is required");
  const user = await User.findOne({ username });
  if (!user) throw new Error("User does not exist");

  next();
};

const validateFollow = async (req, rest, next) => {
  const username = req.body.username;
  if (!username) throw new Error("Username is required");
  const user = await User.findOne({ username });
  if (!user) throw new Error("User does not exist");

  next();
};

module.exports = { validateUnfollow, validateFollow };
