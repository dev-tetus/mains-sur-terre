const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const pool = require("../dbconfig");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Verifier = require("email-verifier");

const keys = require("../config/keys");
const authSchema = require("../Helpers/auth_schema");
const { validateUser } = require("../middlewares/validationMiddleware");

const verifier = new Verifier(keys.API_KEY_VERIFIER);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//* Get all users
router.get("/", async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) console.log(err);
    connection.query("SELECT * FROM users", (e, results) => {
      res.send(results);
    });
  });
});

//*Register user
router.post("/register", validateUser, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(res.locals.password, 10);
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "SELECT * FROM users WHERE username = ? || email = ?",
        [res.locals.username, res.locals.email],
        (err, results) => {
          console.log(results);
          if (Object.keys(results).length === 0) {
            connection.query(
              "INSERT INTO users(email, username, password) VALUES(?,?,?)",
              [res.locals.email, res.locals.username, hashedPassword],
              (err, results) => {
                if (err) throw err;
                res.send(`User ${res.locals.username} created`);
                connection.destroy();
              }
            );
          } else {
            if (results[0].email === res.locals.email) {
              res.send("User already registered");
              connection.destroy();
            } else {
              res.send("Username already taken");
              connection.destroy();
            }
          }
        }
      );
    });
  } catch (e) {
    if (e) throw e;
  }
});

//*Login user
//TODO: Login con mail o username
router.get("/login", async (req, res) => {
  try {
    const validData = await authSchema.loginSchema.validateAsync(req.body);

    //*Mirar si existe en bbdd
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "SELECT * FROM users WHERE username = ? OR email = ?",
        [validData["username"], validData["username"]],
        (err, results) => {
          if (err) throw err;
          if (results.length > 0) {
            bcrypt.compare(
              validData["password"],
              results[0].password,
              (err, same) => {
                if (err) res.sendStatus(500);
                if (same) {
                  res.sendStatus(200);
                  console.log(`User ${results[0].username} connected!`);
                  connection.destroy();
                } else {
                  res.sendStatus(500);
                  console.log("Invalid password");
                  connection.destroy();
                }
              }
            );
          } else {
            res.send("User doesnt exist");
          }
        }
      );
    });
  } catch (e) {
    if (e.isJoi === true) res.send("Invalid input");
  }
});

module.exports = router;
