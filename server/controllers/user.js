const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username });
  if (!user) throw new Error("User not found");
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) throw new Error("Invalid password");

  const token = jwt.sign(
    { username: user.username },
    String(process.env.JWT_SECRET_KEY),
    { expiresIn: "24h" }
  );

  const data = {
    username: user.username,
    token: token,
  };

  res.status(200).json({ success: true, data: data });
};

const signup = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const passwordEncrypt = await bcrypt.hash(password, salt);

  const newUser = new User({
    username: username,
    password: passwordEncrypt,
  });

  await newUser.save();

  res.status(200).json({ success: true, data: 1 });
};

module.exports = { signin, signup };
