const Joi = require("joi");
const express = require("express");

const app = express();

app.use(express.json());

// Create Genre Array for Dummy Data

const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Action" },
  { id: 3, name: "Comedy" }
];

// View All Genres Route
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

// Add New Genre Route
app.post("/api/genres", (req, res) => {
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
app.put("/api/genres/:id", (req, res) => {
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

function validateGenre(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, schema);
}

// Set port from env variable or default ot 3000
const port = process.env.PORT || 4000;

// Set up app listener
app.listen(port, console.log(`Listening on port ${port}`));
