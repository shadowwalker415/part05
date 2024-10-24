const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const User = require("../models/user");
const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
  try {
    await User.deleteMany({});
  } catch (err) {
    console.error(err.message);
  }
});

test("User is created on post request", async () => {
  const userInfo = {
    userName: "mrloyd12",
    name: "Loyd",
    password: "megaman12",
  };

  await api
    .post("/api/users")
    .send(userInfo)
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .expect(201);

  const users = await User.find({});
  assert.strictEqual(users.length, 1);
});

after(async () => {
  await mongoose.connection.close();
});
