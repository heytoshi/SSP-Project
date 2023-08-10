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

  const token = jwt.sign({ username: user.username }, process.env.SECRET, {
    expiresIn: "24h",
  });

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

const search = async (req, res) => {
  const query = req.query.query;
  const username = req.body.token_data.username;

  try {
    if (typeof query === "string") {
      const users = await User.aggregate([
        { $match: { username: { $regex: query, $options: "i" } } },
        {
          $addFields: {
            following: {
              $cond: {
                if: {
                  $in: [username, "$followers.username"],
                },
                then: 1,
                else: 0,
              },
            },
          },
        },
        { $project: { _id: 0, username: 1, following: 1 } },
      ]);
      res.status(200).json({ success: true, data: users });
    } else {
      throw new Error("Invalid search query");
    }
  } catch (error) {
    throw new Error("Error searching for data.");
  }
};

module.exports = { signin, signup, search };
