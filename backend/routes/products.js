const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const pool = require("../dbconfig");
const Joi = require("joi");
const productSchema = require("../Helpers/products_schema");
const {
  authenticateToken,
  validateRole,
} = require("../middlewares/validationMiddleware");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//* Get all Products from db
router.get("/", (req, res) => {
  const selectQuery = "SELECT * FROM produits";
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(selectQuery, (err, result) => {
      res.send({ result });
      connection.destroy();
      if (err) throw err;
    });
  });
});

//* Get one product from db from a given id
router.get("/:id", async (req, res) => {
  try {
    const validId = await productSchema.regexId.validateAsync(req.params.id);
    const getProductQuery = "SELECT * FROM produits WHERE id = ?";

    pool.getConnection((err, connection) => {
      if (err) res.send(err).status(500);
      connection.query(getProductQuery, validId, (error, result) => {
        if (Object.keys(result).length === 0) res.sendStatus(404);
        else {
          res.send(result).status(200);
        }
        connection.destroy();
      });
    });
  } catch (e) {
    if (e.isJoi === true) res.sendStatus(422);
  }
});

//*Insert one unique product to database
router.post(
  "/insert",
  authenticateToken,
  validateRole("admin"),
  async (req, res) => {
    try {
      const validData = await productSchema.insertProduct.validateAsync(
        req.body
      );
      const selectUniqueQuery =
        "INSERT INTO produits (name, description, price)  VALUES (?,?,?)";
      pool.getConnection((err, connection) => {
        if (err) res.send(err).status(500);
        else {
          connection.query(
            selectUniqueQuery,
            [validData["name"], validData["description"], validData["price"]],
            (error, result) => {
              if (error) res.send(error).status(500);
              res.send(result).status(200);
              connection.destroy();
            }
          );
        }
      });
    } catch (e) {
      if (e.isJoi === true) res.send(e);
    }
  }
);

//*Update one product to db with optional params
//?Use of put instead of patch for the moment
router.put("/update/:id", async (req, res) => {
  try {
    const validData = await productSchema.updateProduct.validateAsync(req.body);
    const validId = await productSchema.regexId.validateAsync(req.params.id);
    const updateQuery = "UPDATE produits SET ? WHERE id = ?";
    pool.getConnection((err, connection) => {
      if (err) res.send(err).status(500);
      connection.query(updateQuery, [validData, validId], (error, result) => {
        console.log(result);
        if (result["affectedRows"] === 0) res.sendStatus(404);
        else if (error) res.send(error).status(500);
        else {
          res.sendStatus(200);
          connection.destroy();
        }
      });
    });
  } catch (e) {
    if (e.isJoi === true) res.sendStatus(422);
  }
});

//Delete product from database
router.delete(
  "/delete/:id",
  authenticateToken,
  validateRole("admin"),
  async (req, res) => {
    try {
      const deleteQuery = "DELETE FROM produits where id = ?";
      const validId = await productSchema.regexId.validateAsync(req.params.id);
      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(deleteQuery, validId, (error, result) => {
          res.sendStatus(200);
          connection.destroy();
          if (error) res.send(error).status(500);
        });
      });
    } catch (e) {
      if (e.isJoi === true) res.sendStatus(422);
    }
  }
);

module.exports = router;
