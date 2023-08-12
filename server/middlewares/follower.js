const User = require("../models/user");

const validateUnfollow = async (req, res, next) => {
  const username = req.params.username;
  const myUsername = req.body.token_data.username;

  const existUser = await User.findOne({
    $and: [
      { username: username },
      { followers: { $elemMatch: { username: myUsername } } },
    ],
  });

  if(!existUser) throw new Error('You do not follow this user')
  if (username === myUsername) throw new Error("Same username");
  if (!username) throw new Error("Username is required");
  const user = await User.findOne({ username });
  if (!user) throw new Error("User does not exist");

  next();
};

const validateFollow = async (req, res, next) => {
  const username = req.body.username;
  const myUsername = req.body.token_data.username;

  if (username === myUsername) throw new Error("Same username");
  if (!username) throw new Error("Username is required");
  const user = await User.findOne({ username });
  if (!user) throw new Error("User does not exist");

  next();
};

module.exports = { validateUnfollow, validateFollow };
