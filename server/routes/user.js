const express = require("express");
const { signup, signin } = require("../controllers/user");
const { signupValidate } = require("../middlewares/user");

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signupValidate, signup);

module.exports = router;
