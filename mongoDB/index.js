const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

main()
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));


const userSchema=new mongoose.Schema({
  name:String,
  email:String,
  age:Number
})

const User=mongoose.model("User",userSchema)


const user1=new User({
  name:"piyush chauhan",
  email:"piyushchauhan@gmail.com",
  age:22
})

user1.save()

const user2=new User({
  name:"vansh"
  ,
  age:21,
  email:"vansh@gmail.com"
})


const user3=new User({
  name:"abhinav"
  ,
  age:21,
  email:"abhinav@gmail.com",
  city:"delhi"
})


user2.save()

user3.save().then((res)=>console.log(res)).catch((err)=>console.log(err))