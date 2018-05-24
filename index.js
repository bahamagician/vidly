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

// Set port from env variable or default ot 3000
const port = process.env.PORT || 4000;

// Set up app listener
app.listen(port, console.log(`Listening on port ${port}`));
