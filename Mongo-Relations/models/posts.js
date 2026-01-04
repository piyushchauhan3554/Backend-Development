const Creater = require("./creater.js");
const mongoose = require("mongoose");
const DBConnection = require("../database/db.js");

DBConnection()
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

const postSchema = new mongoose.Schema({
  content: String,
  likes: Number,
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Creater",
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

const insertPost = async () => {
  const c1 = await Creater.findById("695a887baf7a328a2bdeb879");
  const c2 = await Creater.findById("695a887baf7a328a2bdeb87c");
  const c3 = await Creater.findById("695a887baf7a328a2bdeb87d");

  const p1 = new Post({
    content: "mountain view",
    likes: 25,
  });

  const p2 = new Post({
    content: "landscape view",
    likes: 2,
  });

  const p3 = new Post({
    content: "fountain view",
    likes: 255,
  });

  p1.user.push(c1);
  p2.user.push(c2);
  p3.user.push(c3);

  await p1.save();
  await p2.save();
  await p3.save();
};

// insertPost();


const viewPost=async ()=>{
  const doc=await Post.find().populate('user')
  console.log(doc[0]);
  console.log(doc[1]);
  console.log(doc[2]);
}

viewPost()
