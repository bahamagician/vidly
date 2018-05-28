const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Movie, validate } = require("../models/Movie");
const { Genre } = require("../models/Genre");

// View All Movies Route
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

// View a Specific Movie
router.get("/:id", async (req, res) => {
  const movie = await Movie.find({ _id: req.params.id });
  if (!movie) return res.status(404).send("That movie was not found");
  res.send(movie);
});

// Add New Movie Route
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = await new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  }).save();
  res.send(movie);
});

// Update a movie
router.put("/:id", async (req, res) => {
  // Validate movie and if it's invalid, return 400 - Bad Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  // Update Movie
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    },
    { new: true }
  );

  // Throw error if it doesn't exist
  if (!movie) return res.status(404).send("That movie was not found");

  res.send(movie);
});

// Delete a movie
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) return res.status(404).send("That movie was not found");

  // Return the movie
  res.send(movie);
});

module.exports = router;
