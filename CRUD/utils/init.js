const mongoose = require("mongoose");
const Chat = require("../models/Chat");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Error: " + err);
  });

const allChats = [
  {
    from: "piyush",
    to: "abhinav",
    message: "hii , what are you doing",
    created_at: new Date(),
  },
  {
    from: "priya",
    to: "preeti",
    message: "how's the josh",
    created_at: new Date(),
  },
  {
    from: "bheem",
    to: "rajkumari indumati",
    message: "are you alone",
    created_at: new Date(),
  },
  {
    from: "bhanu",
    to: "vansh",
    message: "are you free",
    created_at: new Date(),
  },
  {
    from: "piyush",
    to: "vansh",
    message: "lets play a tdm",
    created_at: new Date(),
  },
];


Chat.insertMany(allChats);