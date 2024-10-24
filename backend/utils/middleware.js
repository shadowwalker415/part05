const User = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("./logger");

const extractToken = function (request, response, next) {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    const authorizationToken = authorization.replace("Bearer ", "").trim();
    request.token = authorizationToken;
  }
  next();
};

const requestInfo = function (request, response, next) {
  logger.info(request.url);
  logger.info(request.body);
  logger.info(request.method);

  next();
};

const extractUser = async function (request, response, next) {
  try {
    const decodedToken = jwt.verify(
      request.token,
      process.env.USER_ACCESS_SECRET
    );
    const user = await User.findById(decodedToken.id);
    request.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const errorHandler = function (error, request, response, next) {
  if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response.status(400).send({ message: "username already exist" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).send({ message: "Unauthorized access" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).send({ message: "Token is expired" });
  } else if (error.name === "ValidationError") {
    return response
      .status(400)
      .send({ message: "request body missing required property" });
  }
  next(error);
};

module.exports = {
  errorHandler,
  extractToken,
  extractUser,
  requestInfo,
};
