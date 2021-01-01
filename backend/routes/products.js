const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

//* Controller
const controller = require("../controllers/productsController");
const { validateRole } = require("../middlewares/auth");

//* Get all Products from db
router.get("/", controller.selectProducts);

//* Get one product from db from a given id
router.get("/:id", controller.selectProduct);

//*Insert one unique product to database
router.post("/insert", validateRole("admin"), controller.insertProduct);

//*Update one product to db with optional params
//?Use of put instead of patch for the moment
router.put("/update/:id", controller.updateProduct);

//Delete product from database
router.delete("/delete/:id", validateRole("admin"), controller.deleteProduct);

module.exports = router;
