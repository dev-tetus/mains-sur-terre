const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads/images");
  },
  filename: function (req, file, cb) {
    file.mimetype !== "image/jpeg" && file.mimetype !== "image/png"
      ? next(ErrorApi.unsupportedMedia("File is not an image"))
      : null;

    let today = new Date().toISOString().slice(0, 10);

    const fileName = today + file.originalname;
    cb(null, fileName);
  },
});

var upload = multer({ storage: storage, fileFilter:  });

//* Controller
const controller = require("../controllers/productsController");
const { validateRole } = require("../middlewares/auth");

//* Get all Products from db
router.get("/", controller.selectProducts);

//* Get one product from db from a given id
router.get("/:id", controller.selectProduct);

//*Insert one unique product to database and upload image on server
router.post("/insert", validateRole("admin"), controller.insertProduct);

//*Update one product to db with optional params
//?Use of put instead of patch for the moment
router.put("/update/:id", controller.updateProduct);

//Delete product from database
router.delete("/delete/:id", validateRole("admin"), controller.deleteProduct);

//*Upload image
router.post("/uploadImage", upload.single("file"), controller.uploadImage);

module.exports = router;
