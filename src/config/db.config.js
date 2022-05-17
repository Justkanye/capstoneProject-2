const mysql = require("mysql");
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
} = require("../utils/secrets");

const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT || 3306,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected");
});

module.exports = connection;
