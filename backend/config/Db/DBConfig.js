const mysql = require("mysql");
const keys = require("../Keys/keys");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: keys.DB.DB_HOST,
  user: keys.DB.DB_USER,
  password: keys.DB.DB_PASSWORD,
  database: keys.DB.DB_NAME,
});
module.exports = pool;
