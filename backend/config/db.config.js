const mysql = require("mysql");
const { knockoutTables } = require("../src/api/db/queries");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3307",
});

con.connect(function (err) {
  if (err) throw err;
  knockoutTables(con);
  console.log("Connection successful!");
});

module.exports = con;
