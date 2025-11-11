const express = require("express");
const path = require("path");
const methodOverride=require('method-override')
const {v4:uuidv4} =require("uuid");
const app = express();

// client to server data: parse by express server
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
// view engine set to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public"))); // for static files : like css file

let posts = [
  {
    id: uuidv4(),
    username: "piyush chauhan",
    content: "my favourite ipl team is rcb",
  },
  { id: uuidv4(), username: "abhinav garg", content: "hardwork is a key to success" },
  { id: uuidv4(), username: "vansh sharma", content: "go to gym everyday" },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("form.ejs");
});

// get specific post on particular id
app.get("/posts/:id", (req, res) => {
  const {id} = req.params;
  console.log(id);
  const post = posts.find((post) => post.id === id);
  console.log(post);
  res.render("show.ejs", { post });
});

app.post("/posts", (req, res) => {
  console.log(req.body);
  const { username, content } = req.body;
  posts.push({ id:uuidv4(), username, content });
  res.redirect("/posts"); // by default get request
});

app.patch("/posts/:id",(req,res)=>{
  let id=req.params.id;
  const newContent=req.body.content;
  let post=posts.find((post)=>post.id===id)
  post.content=newContent
  res.redirect("/posts")
})

app.get("/posts/:id/edit",(req,res)=>{
  const id=req.params.id;
  const post=posts.find((p)=>p.id===id)
  res.render("edit.ejs",post);
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is listening at localhost:${PORT}`);
});
