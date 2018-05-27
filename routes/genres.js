const express = require("express");
const mongoose = require("mongoose");
const { Genre, validate } = require("../models/Genre");
const router = express.Router();

// View All Genres Route
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// View a Specific Genre
router.get("/:id", async (req, res) => {
  const genre = await Genre.find({ _id: req.params.id });
  if (!genre) return res.status(404).send("That genre was not found");
  res.send(genre);
});

// Add New Genre Route
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await new Genre({ name: req.body.name }).save();
  res.send(genre);
});

// Update a genre
router.put("/:id", async (req, res) => {
  // Validate genre and if it's invalid, return 400 - Bad Request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update Genre
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  );

  // Throw error if it doesn't exist
  if (!genre) return res.status(404).send("That genre was not found");

  res.send(genre);
});

// Delete a Genre
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("That genre was not found");

  // Return the genre
  res.send(genre);
});

module.exports = router;
