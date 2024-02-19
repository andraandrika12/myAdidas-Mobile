const jwt = require("jsonwebtoken");
const JWT_SECRET = "JWT_SECRET";

const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  signToken,
  verifyToken,
};