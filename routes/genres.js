const express = require("express");
const Joi = require("joi");
const router = express.Router();

// Create Genre Array for Dummy Data
const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Action" },
  { id: 3, name: "Comedy" }
];

// View All Genres Route
router.get("/", (req, res) => {
  res.send(genres);
});

// View a Specific Genre
router.get("/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("That genre was not found");

  res.send(genre);
});

// Add New Genre Route
router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre);
});

// Update a genre
router.put("/:id", (req, res) => {
  // Look up genre and return 404 if it doesn't exist
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("That genre was not found");

  // Validate genre and if it's invalid, return 400 - Bad Request
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update the genre
  genre.name = req.body.name;
  res.send(genre);
});

// Delete a Genre
router.delete("/:id", (req, res) => {
  // Look up genre and return 404 if it doesn't exist
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("That genre was not found");

  // Delete the genre
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  // Return the genre
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, schema);
}

module.exports = router;
