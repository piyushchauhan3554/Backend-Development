const express=require("express")
const path=require("path")
const app=express()

// client to server data: parse by express server
app.use(express.urlencoded({extended:true}))

// view engine set to ejs
app.set("view engine","ejs")


app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public"))) // for static files : like css file 


app.get("/",(req,res)=>{
  res.send("server is live")
})
const PORT=3000
app.listen(PORT,()=>{
  console.log(`server is listening at localhost:${PORT}`);
})