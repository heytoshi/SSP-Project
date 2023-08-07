const User = require("../models/user"); 

const signupValidate = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) throw new Error("Username and password are required");
  if (password.length < 6) throw new Error("Password should be at least 6 characters long");
  const user = await User.findOne({ username });
  if (user) throw new Error("Not a unique username");

  next();
};


const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new Error("No token provided");
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      throw new Error("Invalid token");
    }
    req.user = user;
    next();
  });
};

module.exports = { signupValidate };
