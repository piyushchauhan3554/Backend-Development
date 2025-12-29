const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ExpressError = require("./ExpressError");


const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/office");
}


main()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });


const officeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {
    type: String,
    required: true,
  },
  buildingNo: {
    type: String,
  },
  helpingNo: {
    type: Number,
    minLength: 10,
  },
});

const Office = mongoose.model("Office", officeSchema);

Office.insertMany([
  {
    name: "wayspire",
    address: "gurugram",
    buildingNo: "A35C",
    helpingNo: 3454343423,
  },
  {
    name: "edutect",
    address: "delhi",
    buildingNo: "A5C",
    helpingNo: 9884343423,
  },
]);

// wrapAsync function

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}
// show office detail route

app.get("/show/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const details = await Office.findById(id);
    if (!details) next(new ExpressError(402, "Invalid credentials"));
    else res.render("show.ejs", { details });
}))

app.get("/error", (req, res) => {
  throw new ExpressError(400, "Error");
});

castErrorHandler=()=>{
  console.log('this is the case error due to id length'); 
}

app.use((err, req, res, next) => {
  console.log("---ERROR---" + err.name);
  if(err.name==="CastError"){
    castErrorHandler()
  }
  next(err);
});

app.use((err, req, res, next) => {
  console.log("---ERROR2---");
  const { status = 500, message = "Some Error" } = err;
  res.status(status).send(message);
});

app.get("/", (req, res) => {
  res.send("i am the root");
});

app.listen(3000, () => {
  console.log(`server is live at localhost:3000`);
});
