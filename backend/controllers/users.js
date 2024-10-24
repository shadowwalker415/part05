const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.post("/", async function (request, response, next) {
  try {
    if (!request.body.userName || !request.body.password) {
      return response.status(400).send({ error: "request body not complete" });
    }
    if (request.body.userName.length < 3 || request.body.password.length < 3) {
      return response.status(400).send({
        error: "username and password must both be at least 3 characters long",
      });
    }
    const passwordHash = await bcrypt.hash(request.body.password, 12);
    const user = new User({
      userName: request.body.userName,
      name: request.body.name,
      password: passwordHash,
    });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

userRouter.get("/", async function (request, response) {
  try {
    const users = await User.find({}).populate("blogs", {
      author: 1,
      title: 1,
      url: 1,
    });
    response.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
