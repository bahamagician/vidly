const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");

// Connect to mongo
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to Mongodb..."))
  .catch(err => console.error("Could not connect to Mongo...", err));

const app = express();

app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

// Set port from env variable or default ot 3000
const port = process.env.PORT || 4000;

// Set up app listener
app.listen(port, console.log(`Listening on port ${port}`));
