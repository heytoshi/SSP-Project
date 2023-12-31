const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const user = require('./routes/user');
const tweet = require('./routes/tweet');
const follower = require('./routes/follower');
const dotenv = require('dotenv');

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/ssp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use('/tweet', tweet);
app.use('/user', user);
app.use('/follower', follower);


const errorNonHandler = (req, res, next) => {
  const error = new Error("Not Found");
  res.status(404);
  next(error);
};

const errorGlobalHandler = (err, req, res, next) => {
  res.status(500).json({ success: false, data: err.message });
};

app.use(errorNonHandler);
app.use(errorGlobalHandler);

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
