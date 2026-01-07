const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
  secret: "mysecret",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(flash());

// middleware to pass the data to ejs file 
app.use((req,res,next)=>{
  res.locals.msg = req.flash("success");
  res.locals.errMsg=req.flash("error");
  next()
})
app.get("/session", (req, res) => {
  res.send(
    "hlo , i am making stateless http to statefull using express sessions"
  );
});

// app.get("/test", (req, res) => {
//   if (req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }
//   res.send(`you came ${req.session.count} times`);
// });

app.get("/response", (req, res) => {
  const { name = "anonymous" } = req.query;
  req.session.name = name;
  if (req.session.name === "anonymous") {
    req.flash("error", "no username received");
  } else {
    req.flash("success", "username received successfully");
  }
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.render("flash.ejs", { name: req.session.name });
});

app.listen(3000, () => {
  console.log("server is live at port:3000");
});
