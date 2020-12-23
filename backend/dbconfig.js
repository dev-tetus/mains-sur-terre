const mysql = require("mysql");
const dotenv = require("dotenv");
const keys = require("./config/prod");

const db = mysql.createPool({
  host: keys.DB_HOST,
  user: keys.DB_USER,
  password: keys.DB_PASSWORD,
  database: keys.DB_NAME,
});

db.getConnection((err, connection) => {
  if (err) throw err;
  else {
    console.log("Successfully connected!!");
    connection.release();
  }
});

module.exports = { db };
