const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const { User, validate } = require("../models/user");
const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const express = require("express");
const { Router } = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.get("/me", auth, async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select("-password");
  if (!user) {
    res.status(404).send("User not found");
  }
  res.send(user);
});

// fictive endpoint to return all users without authorization ):
router.get("/", async (req, res) => {
  const users = await User.find().select("-password");
  if (!users) {
    res.status(404).send("User not found");
  }
  res.send(users);
});

// fictive endpoint to return a user by id without authorization ):
router.get("/:id", validateObjectId, async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(req.body.password, salt);

  user = new User({
    email: req.body.email,
    name: req.body.name,
    password,
  });

  await user.save();

  const token = user.generateUserToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
