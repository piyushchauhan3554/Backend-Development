const express = require("express");

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
    // throw new Error("Access Denied");
    res.send("Access denied")
  }
};

// secure this route
app.get("/api", checkToken, (req, res) => {
  res.send("data");
});

// error 

app.use("/wrong" ,(req,res,next)=>{
  abcd=abcd;
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
