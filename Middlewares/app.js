const express=require("express")

const app=express()

// middleware

app.use((req,res,next)=>{
  console.log('i am the 1st middleware');
  return next()
})


app.use((req,res,next)=>{
  console.log('i am the 2nd middleware');
  next()
})

// routes/ api endpoints
app.get("/",(req,res)=>{
  res.send("i am root route");
})

app.get("/random",(req,res)=>{
  res.send("i am random route");
})

app.listen(3000,()=>{
  console.log('server is live at port:3000');
})