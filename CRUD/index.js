const express = require("express");
const mongoose = require("mongoose");
const Chat = require("./models/Chat");
const methodOverride = require("method-override");
const path = require("path");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Error: " + err);
  });

// routes

app.get("/", (req, res) => {
  res.send("server is live");
});

app.get("/chats", async (req, res) => {
  try {
    const chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", { chats });
  } catch (error) {
    console.log(error);
    res.send("Error while loading chats");
  }
});

app.get("/chats/new", (req, res) => {
  res.render("form.ejs");
});

app.post("/chats", async (req, res) => {
  const { from, to, message } = req.body;
  try {
    await Chat.insertOne({
      from: from,
      to: to,
      message: message,
      created_at: new Date(),
    });
    console.log("Data insert successfully");
    res.redirect("/chats");
  } catch (error) {
    console.log("DB Error" + error);
    res.send("DB Error");
  }
});

app.get("/chats/:id/edit", async (req, res) => {
  const id = req.params.id;
  try {
    const userInfo = await Chat.find({ _id: id });
    console.log(userInfo);
    res.render("edit.ejs", { userInfo });
  } catch (error) {
    console.log("DB Error " + error);
  }
});

app.put("/chats/:id/edit", async (req, res) => {
  const id = req.params.id;
  const { to, from, message } = req.body;
  try {
    const doc = await Chat.findByIdAndUpdate(
      id,
      {
        to: to,
        from: from,
        message: message,
      },
      { new: true }
    );
    console.log(doc);
    res.redirect("/chats")
  } catch (error) {
    console.log(error);
    res.send("Some DataBase Error");
  }
});

app.listen(PORT, () => {
  console.log(`server is listening at PORT:${PORT}`);
});
