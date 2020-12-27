const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const pool = require("../dbconfig");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const Verifier = require("email-verifier");

const keys = require("../config/keys");
const authSchema = require("../Helpers/auth_schema");

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
router.post("/register", async (req, res) => {
  try {
    const validData = await authSchema.registerSchema.validateAsync(req.body);
    const hashedPassword = await bcrypt.hash(validData["password"], 10);
    verifier.verify(validData["email"], async (err, data) => {
      if (err) throw err;
      if (data.dnsCheck === "true") {
        console.log("valid");
        pool.getConnection((err, connection) => {
          if (err) throw err;
          connection.query(
            "SELECT * FROM users WHERE username = ? || email = ?",
            [validData["username"], validData["email"]],
            (err, results) => {
              if (Object.keys(results).length === 0) {
                connection.query(
                  "INSERT INTO users(email, username, password) VALUES(?,?,?)",
                  [validData["email"], validData["username"], hashedPassword],
                  (err, results) => {
                    if (err) throw err;
                    res.send(`User ${validData["username"]} created`);
                    connection.destroy();
                  }
                );
              } else {
                if (results[0].email === validData["email"]) {
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
      } else {
        console.log("not valid");
        res.send("not valid email");
      }
    });
  } catch (e) {
    if (e.isJoi === true) res.sendStatus(422);
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
        [validData["user"], validData["user"]],
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
