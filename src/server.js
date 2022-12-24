const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.status(200);
  res.sendFile(path.resolve("./pages/index.html"));
});

module.exports = app;
