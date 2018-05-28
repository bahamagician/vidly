const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "You must enter a name.",
    minlength: 5,
    maxlength: 50,
    trim: true
  },
  email: {
    type: String,
    required: "You must enter an email.",
    minlength: 5,
    maxlength: 255,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: "You must enter a password",
    trim: true,
    minlength: 5,
    maxlength: 1024
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

// Define Customer Model
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema;
