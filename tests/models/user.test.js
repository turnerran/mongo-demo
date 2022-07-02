const { items } = require("joi/lib/types/array");
const { User } = require("../..//models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

describe("user.generateAuthToken", () => {
  it("should return a valid JWT", () => {
    const id = new mongoose.Types.ObjectId();
    const payload = { _id: id, isAdmin: true };
    const user = new User(payload);
    const token = user.generateUserToken();
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decoded).toMatchObject({ _id: id.toString(), isAdmin: true });
  });
});
