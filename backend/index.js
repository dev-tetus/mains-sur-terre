const express = require("express");

const app = express();
const cors = require("cors");
const db = require("./config");
require("dotenv").config();

const port = process.env.PORT || 3001;

app.use(cors());

app.listen(port, () => {
  console.log(`listening on ${port}`);
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
