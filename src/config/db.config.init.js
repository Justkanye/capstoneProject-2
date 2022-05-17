const mysql = require("mysql");
const { DB_HOST, DB_PORT, DB_USER, DB_PASS } = require("../utils/secrets");

const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT || 3306,
  user: DB_USER,
  password: DB_PASS,
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
