const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2003",
  database: "banking",
});

module.exports = db;
