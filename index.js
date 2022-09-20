const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbConnection } = require("./database/config");

console.log(process.env.PORT);

// Create express server
const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Public Directory
app.use(express.static("public"));

// Read and parse body
app.use(express.json());

//Rouites
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// Listen petitions
app.listen(4000, () => {
  console.log(`Server on port ${4000}`);
});
