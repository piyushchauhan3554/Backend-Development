const mongoose = require("mongoose"); // commonJs

// mongoose support operational buffering
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

main()
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));

// write schema : structure of our document
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// creating model is like creating a (Collection)
const User = mongoose.model("User", userSchema);

const user1 = new User({
  name: "piyush chauhan",
  email: "piyushchauhan@gmail.com",
  age: 22,
});

// user1.save();

const user2 = new User({
  name: "vansh",
  age: 21,
  email: "vansh@gmail.com",
});

// user2.save();

const user3 = new User({
  name: "abhinav",
  age: 21,
  email: "abhinav@gmail.com",
  city: "delhi",
});

// user3.save();

// insertMany()

// User.insertMany([
//   {
//     name: "panda",
//     email: "panda123",
//     age: 40,
//   },
//   {
//     name: "priya",
//     email: "priya123",
//     age: 25,
//   },
//   {
//     name: "gargabhi",
//     email: "garg123",
//     age: 33,
//   },
// ]);

// read operation :- find data in the database

User.find({})
  .then((res) =>
    console.log("number of users in the database :- " + res.length)
  )
  .catch((err) => console.log(err));

User.findOne({ age: { $gt: 30 } })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

User.findOne({ _id: "694a84c8b2b55550d67b09ff" })
  .then((res) => console.log(res.name))
  .catch((err) => console.log(err));

User.findById("694a84c8b2b55550d67b09ff")
  .then((res) => {
    console.log(res._id);
  })
  .catch((err) => console.log(err));
