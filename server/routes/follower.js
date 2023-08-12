const express = require("express");
const { follow, unfollow, getFollowers, getFollowing } = require("../controllers/follower");
const { authenticate } = require("../middlewares/token");
const { validateFollow, validateUnfollow } = require("../middlewares/follower");
const router = express.Router();

router.post("/", authenticate, validateFollow, follow);
router.delete("/:username", authenticate, validateUnfollow, unfollow);

router.get('/', authenticate, getFollowers)
router.get('/following', authenticate, getFollowing)

module.exports = router;
