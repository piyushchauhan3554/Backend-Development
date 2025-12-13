
const mongoose = require("mongoose");
// create a schema

const userInfoSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    secondName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("userModel", userInfoSchema);


module.exports=userModel;