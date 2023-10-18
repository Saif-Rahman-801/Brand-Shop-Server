const express = require("express");
const cors = require("cors");
require("dotenv").config();
const brands = require("./brands.json");
const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/brands", (req, res) => {
  res.send(brands);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
