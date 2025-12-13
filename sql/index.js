const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "delta_app",
});

// insert data into table using placeholders, (dynamic data)
let q = "insert into users(id,username,email,password) values ?";
let data = [];
const createUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

for(let i=1;i<=50;i++) data.push(createUser());
try {
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    // console.log("number of tables : " + result.length);
    // for (let i = 0; i < result.length; i++) console.log(result[i]);
  });
} catch (error) {
  console.log(error);
}


connection.end();
