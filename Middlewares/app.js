const express=require("express")

const app=express()

// middleware

// app.use((req,res,next)=>{
//   console.log('i am the 1st middleware');
//   return next()
// })


// app.use((req,res,next)=>{
//   console.log('i am the 2nd middleware');
//   next()
// })

// utility middleware : perform some task
// custom logger : log imp info on console // pre-built : morgan (3rd party middleware)

// app.use((req,res,next)=>{
//   req.time=new Date();
//   console.log(`method: ${req.method}   path: ${req.path}   host: ${req.host}  time: ${req.time.toString().split(" ")[4]} date: ${req.time.toString().split(" ").slice(0,4).join(" ")}`);
//   next();
// })

// middleware
app.use("/random",(req,res,next)=>{
  console.log('i am for /random route');
  next();
})

// routes/ api endpoints
app.get("/",(req,res)=>{
  res.send("i am root route");
})

app.get("/random",(req,res)=>{
  res.send("i am random route");
})

// error middleware
app.use((req,res)=>{
  res.status(404).send("Page Not Found")
})

app.listen(3000,()=>{
  console.log('server is live at port:3000');
})