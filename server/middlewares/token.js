const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) throw new Error("Unauthorized");

  jwt.verify(token, process.env.SECRET, (err, token) => {
    if (err) throw new Error("Invalid token");

    req.body["token_data"] = token;
    next();
  });
};

module.exports = { authenticate };
