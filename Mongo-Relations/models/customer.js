// mongoose relationship: one to many
// customer- orders

const mongoose = require("mongoose");
const DBConnection = require("../database/db.js");
const Order=require("./order.js")

DBConnection()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));


// customer Schema

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Customer=mongoose.model("Customer",customerSchema)

const insertCustomer = async ()=>{
  const c1=new Customer({
    name:"piyush chauhan"
  })
  const o1=await Order.findOne({name:"kite"})
  const o2=await Order.findOne({name:"watch"})
  c1.orders.push(o1)
  c1.orders.push(o2)

  const doc= await c1.save()
  console.log(doc);
  
}

insertCustomer()