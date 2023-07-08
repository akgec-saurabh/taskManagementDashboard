const jwt = require("jsonwebtoken");
const httpError = require("../models/http-error");

module.exports = (req, res, next) => {
 
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer Token'
    if (!token) {
      throw new Error("Authentication failed");
    }
    const decodedToken = jwt.verify(token, "Super_secret_key");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return next(httpError("Authentication failed", 401));
  }
};
