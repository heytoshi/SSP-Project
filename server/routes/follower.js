const express = require("express");
const { follow, unfollow } = require("../controllers/follower");
const { authenticate } = require("../middlewares/token");
const { validateFollowAndUnfollow } = require("../middlewares/follower");
const router = express.Router();

router.post("/", authenticate, validateFollowAndUnfollow, follow);
router.delete("/", authenticate, validateFollowAndUnfollow, unfollow);

module.exports = router;
