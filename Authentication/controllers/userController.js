const userModel = require("../models/userInfoModel");
const { v4: uuidv4 } = require("uuid");

const { setInfo, getInfo } = require("../utils/notebook");

const signUpHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await userModel.create({
      name: name,
      email: email,
      password: password,
    });
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.json({
      error: error.message,
    });
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (user) {
      const uuid = uuidv4();
      setInfo(uuid, user);
      res.cookie("uid", uuid);
      return res.redirect("/");
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      error: error.message,
    });
  }
};

module.exports = { signUpHandler, loginHandler };
