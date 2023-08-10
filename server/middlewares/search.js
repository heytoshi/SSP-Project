const User = require("../models/user");
const search = async (query) => {
  try {
    const users = await User.find(
      { username: { $regex: query, $options: "i" } },
      { username: 1, _id: 0 }
    );
    return users;
  } catch (error) {
    throw new Error("Error searching for data.");
  }
};

module.exports = { search };
