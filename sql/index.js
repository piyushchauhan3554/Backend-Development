const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");

const { v4: uuidv4 } = require("uuid");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true })); // for parsing
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

// edit route

app.get("/users/:id/edit", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const q = `select * from users where id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      const user = result[0];
      console.log(user);
      res.render("Edit.ejs", { user });
    });
  } catch (error) {
    console.log(error);
    res.send("Some Error in DB");
  }
});

// update username route (edit)

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  const q = `select * from users where id = '${id}'`;
  try {
    connection.query(q, (err, user) => {
      if (err) throw err;
      const userPassword = user[0].password;
      if (userPassword != password) {
        res.send("WRONG PASSWORD");
      } else {
        const q2 = `update users set username = '${username}' where id = '${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          console.log(result);
          res.redirect("/users");
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.send("DB Error");
  }
});

// add new user form  route

app.get("/users/add", (req, res) => {
  res.render("form.ejs");
});

// add user route

app.post("/users/add", (req, res) => {
  const { username, email, password } = req.body;
  const newUserData = [];
  newUserData.push(uuidv4());
  newUserData.push(username);
  newUserData.push(email);
  newUserData.push(password);

  // console.log(newUserData);

  try {
    const q = "insert into users (id,username,email,password) values(?,?,?,?)";

    connection.query(q, newUserData, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
    res.send("Database error");
  }
});

// delete user form

app.get("/users/:id/delete", (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.render("delete.ejs",{id});
});

// delete route (delete from DB)

app.delete("/users/:id/delete", (req, res) => {
  const { email, password } = req.body;
  const id  = req.params.id;
  console.log(id);
  
  try {
    const q = `select * from users where id = '${id}'`;

    connection.query(q, (err, user) => {
      if (err) throw err;
      console.log(user);
      
      if (email == user[0].email && password == user[0].password) {
        const q2 = `delete from users where id ='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/");
        });
      } else {
        res.send("Wrong / Invalid credentials");
      }
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
