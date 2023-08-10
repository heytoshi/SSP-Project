const express = require("express");
const { signup, signin, search } = require("../controllers/user");
const { signupValidate } = require("../middlewares/user");
const { authenticate } = require("../middlewares/token");
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signupValidate, signup);
router.get('/', authenticate, search);

module.exports = router;
