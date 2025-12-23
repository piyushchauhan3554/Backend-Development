const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

main()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Error " + err);
  });

// create a schema

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name should be provided"],
    maxLength: [20, "length is too big"],
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    default: 100,
  },
  discount: {
    type: Number,
    min: 20,
  },
  genre: {
    type: [String],
  },
  category: {
    type: String,
    enum: ["fiction", "Non-fiction"],
  },
});

// create a model

const Book = mongoose.model("Book", bookSchema);

const book1 = new Book({
  name: "chota bheem",
  author: "piyush chauhan",
  genre: ["math", "not-ncert", "toppers-book"],
  discount: 100,
  category: "Non-fiction",
});

// book1
//   .save()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

Book.findOneAndUpdate({ name: "chota bheem" }, { discount: 10 },{runValidators:true})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
