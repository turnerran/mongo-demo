const config = require("config");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const { Router } = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const userValidation = require("../consts/user.js");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or password"); // not returning 404. we don't want
    // to give the client info if this user exists and just the password is not correct
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) {
    return res.status(400).send("Invalid email or password"); // not returning 404. we don't want
    // to give the client info if this user exists and just the password is not correct
  }

  const token = user.generateUserToken();
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string()
      .required()
      .min(userValidation.MIN_EMAIL_LENGTH)
      .max(userValidation.MAX_EMAIL_LENGTH)
      .email(),
    password: Joi.string()
      .required()
      .min(userValidation.MIN_PASSWORD_LENGTH)
      .max(userValidation.MAX_PASSWORD_LENGTH),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
