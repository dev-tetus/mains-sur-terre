const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const pool = require("../dbconfig");
const Joi = require('joi');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//* Get all Products from db
router.get("/", (req, res) => {
  const selectQuery = "SELECT * FROM produits";
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(selectQuery, (err, result) => {
      res.send({ result });
      connection.release();
      if (err) throw err;
    });
  });
});

//* Get one product from db from a given id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  //* Validate params and catch error in case of not valid
  try {
    const validate = await Joi.string().regex(/^\d+$/).required().validateAsync(id);
    const getProductQuery = "SELECT * FROM produits WHERE id = ?";

    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(getProductQuery, id, (error, result) => {
        if (Object.keys(result).length === 0) res.sendStatus(404);
        else {
          res.send(result);
        }
      })
    });
  } catch (e) {
    if (e.isJoi === true) res.sendStatus(422);

  }
})

//*Insert one unique product to database
//TODO: Validate data with Joi and do try catch
router.post("/insert", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;


  const selecteUniqueQuery =
    "INSERT INTO produits (name, description, price)  VALUES (?,?,?)";
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(selecteUniqueQuery, [name, description, price], (error, result) => {
      res.status(200).send(result);
      connection.release();
      if (error) throw error;
    }
    );
  });
});

//*Update one product to db with optional params
//?Use of put instead of patch for the moment
//TODO: Make schema on separated file
router.put("/update/:id", (req, res) => {
  //* SCHEMA for validation

  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    description: Joi.string().min(5).max(500),
    price: Joi.number().greater(0),
  })

  try {
    if (Object.keys(req.body).length === 0) {
      res.send("no data");
    }
    else {
      const updateQuery = "UPDATE produits SET ? WHERE id = ?";
      const value = schema.validate(req.body);
      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(updateQuery, [req.body, req.params.id], (error, result) => {
          res.status(200).send(result)
          connection.release();
          if (error) throw error;
        })
      })

    }
  } catch (e) {
  }

});

//Delete product from database
//TODO: Validate id data with Joi like router.get(/:id) and do try catch
router.delete("/delete/:id", (req, res) => {
  const deleteQuery = "DELETE FROM produits where id = ?";
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(deleteQuery, req.params.id, (error, result) => {
      res.send(result);
      console.log(result.affectedRows);
      connection.release();
      if (error) console.error(error.message);
    })
  })
})

module.exports = router;
