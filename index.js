const Joi = require("joi");
const express = require("express");

const app = express();

app.use(express.json());

// Set port from env variable or default ot 3000
const port = process.env.PORT || 3000;

// Set up app listener
app.listen(port, console.log(`Listening on port ${port}`));