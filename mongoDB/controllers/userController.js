const userModel = require('../models/userModel');

// Insert User
const insertHandler = async (req, res) => {
  try {
    const { firstName, secondName, email } = req.body;

    const user = await userModel.create({
      firstName,
      secondName,
      email,
    });

    res.status(201).json({
      message: "User inserted successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Users
const getHandler = async (req, res) => {
  try {
    const data = await userModel.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single User
const singleUserHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete User
const deleteHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  insertHandler,
  getHandler,
  singleUserHandler,
  deleteHandler,
};
