const User = require("../models/user");

const signupValidate = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password)
    throw new Error("Username and password are required");
  if (password.length < 8)
    throw new Error("Password should be at least 8 characters long");
  const user = await User.findOne({ username });
  if (user) throw new Error("Not a unique username");

  next();
};

const validateFollowAndUnfollow = async (req, rest, next) => {
  const username = req.body.username;
  if (!username) throw new Error("Username is required");
  const user = await User.findOne({ username });
  if (!user) throw new Error("User does not exist");

  next();
};

module.exports = { signupValidate, validateFollowAndUnfollow };
