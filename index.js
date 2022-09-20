const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbConnection } = require("./database/config");

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
app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
});
