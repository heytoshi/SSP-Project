const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  { tweet: { type: String, required: true } },
  { timestamps: true, versionKey: false }
);

module.exports = tweetSchema;
