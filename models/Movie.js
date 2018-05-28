const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./Genre");
// Define Movie Schema
const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: "You must enter a title.",
      minlength: 5,
      maxlength: 255,
      trim: true
    },
    genre: genreSchema,
    numberInStock: {
      type: Number,
      required: "Number in stock is requried",
      min: 0,
      max: 50
    },
    dailyRentalRate: {
      type: Number,
      required: "Rental rate is required",
      min: 0,
      max: 50
    }
  })
);

function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(255)
      .required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required()
  };
  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
