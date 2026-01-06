const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser("mysecret"));
// routes

// root route
app.get("/", (req, res) => {
  res.send("i am root route");
});

// index route
app.get("/users", (req, res) => {
  res.send("my work is to display all the users ");
});

// send cookie route

app.get("/sendCookie", (req, res) => {
  res.cookie("madeIn", "usa");
  res.cookie("greet", "namaste");
  res.send("cookie has been sent");
});

// send signed cookie

app.get("/sendSignedCookies", (req, res) => {
  res.cookie("price", "3000", { signed: true });
  res.send("signed cookie sent successfully");
});

// get signed cookie

app.get("/getSignedCookies", (req, res) => {
  console.log(req.signedCookies);
  res.send("we get the signedCookie")
});

// get cookie

app.get("/getCookie", (req, res) => {
  console.log(req.cookies);
  res.send("we got the cookie");
});

// greet route

app.get("/greet", (req, res) => {
  const { name = "super hero" } = req.cookies; // for unsigned cookies
  res.send(`hii ${name}`);
});

app.get("/verify",(req,res)=>{
  const {price}=req.signedCookies;
  if(price==false){
    console.log('data must be tampered');
    console.log(req.signedCookies);
  }
  res.send("we are verifying..")
})

app.listen(3000, () => {
  console.log("server is live at port:3000");
});
