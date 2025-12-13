const express = require("express");
const {
  insertHandler,
  getHandler,
  singleUserHandler,
  deleteHandler,
} = require("../controllers/userController");
const router = express.Router();

router.post("/add", insertHandler);
router.get("/", getHandler);
router.get("/:id", singleUserHandler);
router.delete("/:id", deleteHandler);

module.exports = router;
