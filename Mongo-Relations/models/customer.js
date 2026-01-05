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

// customerSchema.pre("findOneAndDelete",async ()=>{
//   console.log('pre middleware');
// })

customerSchema.post("findOneAndDelete",async (cus)=>{
  if(cus.orders.length){
    const doc=await Order.deleteMany({_id:{$in:cus.orders}})
    console.log(doc);
    
  }
})


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

// insertCustomer()

// findCustomer()

async function findCustomer(){
  const doc=await Customer.find().populate("orders")
  console.log(doc[0]);
  
}

const delCust=async ()=>{
  const del=await Customer.findByIdAndDelete("695b901f265ed422d36e21a5")
  console.log(del); 
}

delCust()