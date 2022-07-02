const mongoose = require("mongoose");
const Joi = require("joi");
const userValidation = require("../consts/user.js");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minLength: userValidation.MIN_NAME_LENGTH,
    maxLength: userValidation.MAX_NAME_LENGTH,
  },
  email: {
    required: true,
    type: String,
    minLength: userValidation.MIN_EMAIL_LENGTH,
    maxLength: userValidation.MAX_EMAIL_LENGTH,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    minLength: userValidation.MIN_EMAIL_LENGTH,
    maxLength: userValidation.MAX_EMAIL_LENGTH,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateUserToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey"),
    {
      expiresIn: "3600s",
    }
  );
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .required()
      .min(userValidation.MIN_NAME_LENGTH)
      .max(userValidation.MAX_NAME_LENGTH),
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

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
