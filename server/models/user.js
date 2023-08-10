const mongoose = require("mongoose");
const tweetSchema = require("./tweet");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    followers: [{ username: { type: String, required: false } }],
    following: [{ username: { type: String, required: false } }],
    tweets: [tweetSchema],
  },
  { timestamps: true, versionKey: false }
);
userSchema.index({ username: 1 });

const User = mongoose.model("User", userSchema);

module.exports = User;
