const express = require("express");
const router = express.Router();

//* Controller
const controller = require("../controllers/usersController");

//* Middlewares
const { authenticateUser, validateRole } = require("../middlewares/auth");

router.use(authenticateUser);
//*Get all users

router.get("/", validateRole("admin"), controller.getUsers);

router.get("/user/profile", controller.getUserProfile);

module.exports = router;
