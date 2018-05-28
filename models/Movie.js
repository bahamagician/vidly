const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./Genre");

// Define Movie Schema
const movieSchema = new mongoose.Schema({
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
});

// Define Movie Model
const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(255)
      .required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required()
  };
  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
exports.movieSchema = movieSchema;
