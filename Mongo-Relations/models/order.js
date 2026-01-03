const mongoose = require("mongoose");
const DBConnection = require("../database/db.js");

DBConnection()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));


const orderSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const Order = mongoose.model("Order", orderSchema);

const insertOrder = async () => {
  await Order.insertMany([
    {
      name: "watch",
      price: 8080,
    },
    {
      name: "kite",
      price: 999,
    },
  ]);
};
insertOrder();

module.exports=Order;