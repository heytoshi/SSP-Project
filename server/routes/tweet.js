const express = require("express");
const { tweet } = require("../controllers/tweet");

const router = express.Router();

router.post("/", tweet);

module.exports = router;
