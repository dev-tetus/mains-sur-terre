const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const pool = require("../dbconfig");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//Get all Products from db
router.get("/", (req, res) => {
  const selectQuery = "SELECT * FROM produits";
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(selectQuery, (err, result) => {
      res.json({ result });
      connection.release();
      if (err) throw err;
    });
  });
});
//Insert one unique product to database
router.post("/insert", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;

  const selecteUniqueQuery =
    "INSERT INTO produits (name, description, price)  VALUES (?,?,?)";
  pool.getConnection((err, connection) => {
    connection.query(
      selecteUniqueQuery,
      [name, description, price],
      (err, result) => {
        res.send({ result });

        if (err) throw err;
      }
    );
  });
});

module.exports = router;
