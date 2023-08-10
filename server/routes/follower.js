const express = require("express");
const { follow, unfollow } = require("../controllers/follower");
const { authenticate } = require("../middlewares/token");
const { validateFollow, validateUnfollow } = require("../middlewares/follower");
const router = express.Router();

router.post("/", authenticate, validateFollow, follow);
router.delete("/:username", authenticate, validateUnfollow, unfollow);

module.exports = router;
