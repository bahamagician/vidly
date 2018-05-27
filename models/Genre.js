const mongoose = require("mongoose");
const Joi = require("joi");

// Define course schema
const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: "You must enter a name.",
      minlength: 5,
      maxlength: 50,
      trim: true
    }
  })
);

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;
