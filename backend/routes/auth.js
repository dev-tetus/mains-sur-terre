const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const pool = require("../dbconfig");
const Joi = require("joi");
const authSchema = require("../Helpers/auth_schema");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//* Get all users
router.get("/", async (req, res) => {
  try {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query("SELECT * FROM users", (e, results) => {
        res.send(results);
      });
    });
  } catch (error) {
    if (error) throw error;
  }
});

//*Register user
router.post("/register", async (req, res) => {
  try {
    const validData = await authSchema.registerSchema.validateAsync(req.body);
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "SELECT * FROM users WHERE username = ?",
        validData["username"],
        (err, results) => {
          if (Object.keys(results).length === 0) {
            connection.query(
              "INSERT INTO users(username, password) VALUES(?,?)",
              [validData["username"], validData["password"]],
              (err, results) => {
                if (err) throw err;
                res.send(results);
                connection.destroy();
              }
            );
          } else {
            res.send("Username already taken");
          }
        }
      );
    });
  } catch (e) {
    if (e.isJoi === true) res.sendStatus(422);
  }
});

module.exports = router;
