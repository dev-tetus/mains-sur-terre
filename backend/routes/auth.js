require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

//* Controller
const controller = require("../controllers/authController");

//* Middlewares
const { validateUser } = require("../middlewares/validationMiddleware");
const { redirectLogin, isLoggedIn } = require("../middlewares/auth");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//*Register user
router.post("/register", validateUser, controller.register);

//*Login user
router.post("/login", isLoggedIn, controller.login);

router.delete("/logout", redirectLogin, controller.logout);

module.exports = router;
