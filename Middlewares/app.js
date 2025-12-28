const express = require("express");
const ExpressError=require("./ExpressError.js")
const app = express();

// middlewares

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
app.use("/random", (req, res, next) => {
  console.log("i am for /random route");
  next();
});

// authentication middleware : check the token for api access

// we can use multiple middleware together
const checkToken = (req, res, next) => {
  const { token } = req.query;
  if (token === "giveaccess") next();
  else{
     throw new ExpressError(401,"Access Denied");
    // res.send("Access denied") // end req-res cycle
  }
};

// secure this route
app.get("/api", checkToken, (req, res) => {
  res.send("data");
});

// error 

// in this case , express default error handler runs
// if there is no custom error handler middleware
app.use("/err" ,(req,res,next)=>{
  abcd=abcd;
})


// activity question
app.get("/admin",(req,res)=>{
  throw new ExpressError(403,"Forbidden")
})


// custom error handler middlewares 

app.use((err,req,res,next)=>{
  console.log('--------Error--------');
  next(err);
})

app.use((err,req,res,next)=>{
  console.log('--------Error 2--------');
  const {status=500,message}=err;
  res.status(status).send(message)
})

// routes/ api endpoints
app.get("/", (req, res) => {
  res.send("i am root route");
});

app.get("/random", (req, res) => {
  res.send("i am random route");
});

// error middleware
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(3000, () => {
  console.log("server is live at port:3000");
});
