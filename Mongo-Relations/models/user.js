const DBConnection = require("../database/db.js");
const mongoose = require("mongoose");

DBConnection()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err))

// mongoose relationship :- one to few
// users-address
const userSchema = new mongoose.Schema({
  name: { type: String },
  addresses: [
    {
      _id: false,
      location: { type: String },
      city: { type: String },
    },
  ],
});

const User = mongoose.model("User", userSchema);

async function insertData() {
  const u1 = new User({
    name: "piyush chauhan",
    addresses: [
      {
        location: "HKC Sector 112",
        city: "Mumbai",
      },
    ],
  });

  u1.addresses.push({
    location: "Noida Sector 62",
    city: "Noida",
  });

  await u1.save();
}

insertData();
