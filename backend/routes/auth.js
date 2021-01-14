require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

//* Controller
const controller = require("../controllers/authController");

//* Middlewares
const { validateUser } = require("../middlewares/validationMiddleware");
const { redirectLogin, isLoggedIn } = require("../middlewares/auth");

//*Register user
router.post("/register", validateUser, controller.register);

//*Login user
router.post("/login", isLoggedIn, controller.login);

router.delete("/logout", redirectLogin, controller.logout);

router.get("/session", controller.session);

module.exports = router;
