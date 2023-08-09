const express = require("express");
const { tweet, get } = require("../controllers/tweet");
const { authenticate } = require("../middlewares/token");
const { tweetValidate } = require("../middlewares/tweet");
const router = express.Router();

router.post("/", authenticate, tweetValidate, tweet);
router.get("/", authenticate, get);

module.exports = router;
