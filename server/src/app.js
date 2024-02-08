// app.js
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/userRoutes");
const cors = require('cors');
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/haufe-ddbb");

app.use(cors());
app.use(express.json());

// Usar las rutas definidas en routes.js
app.use("", routes);

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

process.on("beforeExit", () => {
  mongoose.disconnect();
  console.log("MongoDB connection closed.");
});
module.exports = app;
