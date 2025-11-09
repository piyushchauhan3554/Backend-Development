const express=require("express")
const path=require("path")
const app=express()

// client to server data: parse by express server
app.use(express.urlencoded({extended:true}))

// view engine set to ejs
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public"))) // for static files : like css file 

let posts=[{
  username:"piyush chauhan",
  content:"my favourite ipl team is rcb"
},{
  username:"abhinav garg",
  content:"hardwork is a key to success"},{
  username:"vansh sharma",
  content:"go to gym everyday"
}]

app.get("/posts",(req,res)=>{
  res.render("index.ejs",{posts});
})
const PORT=3000
app.listen(PORT,()=>{
  console.log(`server is listening at localhost:${PORT}`);
})