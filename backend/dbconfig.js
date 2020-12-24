const mysql = require('mysql');


const keys = require("./config/keys");



const pool = mysql.createPool({
  connectionLimit: 10,
  host: keys.DB_HOST,
  user: keys.DB_USER,
  password: keys.DB_PASSWORD,
  database: keys.DB_NAME,
});
module.exports = pool;
