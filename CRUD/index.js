const express = require("express");
const mongoose = require("mongoose");
const Chat=require("./models/Chat")
const path = require("path");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Error: " + err);
  });


// routes

app.get("/", (req, res) => {
  res.send("server is live");
});

app.listen(PORT, () => {
  console.log(`server is listening at PORT:${PORT}`);
});
