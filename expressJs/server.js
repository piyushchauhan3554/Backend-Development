require('dotenv').config();
let path = require('path');
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Set the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
console.log("Views folder path:", path.join(__dirname, "views"));

app.get('/', (req, res) => {
  res.render("home.ejs");   
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
