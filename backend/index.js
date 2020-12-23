const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

app.use(cors());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/api", (req, res) => {
  res.send("Hello world");
});

app.get("/produits", (req, res) => {
  const selectStatement = "select * from produits ";
  db.query(selectStatement, (err, result) => {
    if (err) {
      throw err;
    } else res.send(result).json;
  });
});

app.get("/produits/insert", (req, res) => {
  const insertStatement =
    "INSERT INTO produits(name, description, price) VALUES('newName', 'amazing stuff', 23)";
  db.query(insertStatement, (err, result) => {
    if (err) {
      throw err;
    } else res.send("Succesfully added!!");
  });
});
