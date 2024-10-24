const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

loginRouter.post("/", async (request, response, next) => {
  try {
    const user = await User.findOne({ userName: request.body.userName });
    const authenticated =
      user === null
        ? false
        : await bcrypt.compare(request.body.password, user.password);
    if (!(user && authenticated))
      return response
        .status(401)
        .send({ message: "Invalid username or password" });

    const tokenOwner = {
      userName: user.userName,
      id: user._id,
    };
    const token = jwt.sign(tokenOwner, process.env.USER_ACCESS_SECRET, {
      expiresIn: 60 * 60,
    });
    const signedUser = {
      token,
      userName: user.userName,
      name: user.name,
    };
    response.status(200).json(signedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = loginRouter;
