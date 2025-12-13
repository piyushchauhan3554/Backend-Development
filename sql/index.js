const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "delta_app",
});

let q = "show tables";
try {
  connection.query(q, (err, result) => {
    if (err) throw new err();
    console.log("number of tables : " + result.length);
    for(let i=0;i<result.length;i++) console.log(result[i]);
    
  });
} catch (error) {
  console.log(error);
}

const createUser = () => {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

connection.end();

// console.log(createUser());
