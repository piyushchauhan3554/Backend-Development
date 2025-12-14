const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "delta_app",
});

const createUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

const port = 3000;
app.listen(port, () => {
  console.log(`server is listening at PORT:${port}`);
});

// routes

// get no. of users (home route)
app.get("/", (req, res) => {
  let q = "select count(*) from users";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let userCnt = result[0]["count(*)"];
      // console.log(`no. of users are` + userCnt);
      res.render("Home.ejs", { userCnt });
    });
  } catch (error) {
    console.log(error);
  }
});

// display all users data
// show route

app.get("/users", (req, res) => {
  try {
    let q = "select * from users";
    connection.query(q, (err, users) => {
      if (err) throw err;
      // console.log(users);
      res.render("show.ejs", { users });
    });
  } catch (error) {
    console.log(error);

    res.send("DB Error");
  }
});

// insert data into table using placeholders, (dynamic data)
// let q = "insert into users(id,username,email,password) values ?";
// let data = [];

// for(let i=1;i<=100;i++) data.push(createUser());
// try {
//   connection.query(q, [data], (err, result) => {
//     if (err) throw err;
//   });
// } catch (error) {
//   console.log(error);
// }

// connection.end();
