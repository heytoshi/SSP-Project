const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    followers: [{ type: String, required: false }],
    following: [{ type: String, required: false }],
    tweets: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
