const express = require("express");
require("dotenv").config();
const connectDB = require("./utils/db");
const userRouter = require("./routes/UserRouter");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB(process.env.db_url)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

// Routes
app.use("/api/users", userRouter);

// Test Route
app.get("/", (req, res) => {
  res.send("API is working...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
