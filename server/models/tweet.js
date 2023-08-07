const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema(
  { content: { type: String, required: true } },
  { timestamps: true, versionKey: false }
);

module.exports = tweetSchema;
