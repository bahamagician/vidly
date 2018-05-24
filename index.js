const express = require("express");
const genres = require("./routes/genres");

const app = express();

app.use(express.json());

app.use("/api/genres", genres);

// Set port from env variable or default ot 3000
const port = process.env.PORT || 4000;

// Set up app listener
app.listen(port, console.log(`Listening on port ${port}`));
