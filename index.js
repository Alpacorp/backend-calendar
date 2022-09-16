const express = require("express");
require("dotenv").config();

console.log(process.env.PORT);

// Create express server
const app = express();

// Public Directory
app.use(express.static("public"));

// Read and parse body
app.use(express.json());

//Rouites
app.use("/api/auth", require("./routes/auth"));
// TODO: CRUD: events

// Listen petitions
app.listen(4000, () => {
  console.log(`Server on port ${4000}`);
});
