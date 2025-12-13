require("dotenv").config();
const express = require("express");
const { auth } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const connectDB = require("./utils/db");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const userRouter = require("./routes/userRouter");

connectDB(process.env.db_url)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;
app.get("/signup", (req, res) => {
  res.render("Signup");
});
app.get("/login", (req, res) => {
  res.render("Login");
});
app.use("/users", userRouter);
app.get("/", auth, (req, res) => {
  res.render("home");
});
app.listen(PORT, () => {
  console.log(`server is listening at localhost:${PORT}`);
});
