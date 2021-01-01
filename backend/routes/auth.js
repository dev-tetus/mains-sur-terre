require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const pool = require("../config/Db/DBConfig");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Verifier = require("email-verifier");

const keys = require("../config/Keys/keys");
const authSchema = require("../Helpers/auth_schema");
const {
  validateUser,
  authenticateToken,
  validateRole,
  refreshTokenRequest,
  authenticateUser,
} = require("../middlewares/validationMiddleware");

const verifier = new Verifier(keys.MAIL_VERIFIER.API_KEY);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//* Get all users
router.get(
  "/",
  // authenticateToken,
  authenticateUser,
  validateRole("admin"),
  async (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) console.log(err);
      connection.query("SELECT * FROM users", (e, results) => {
        res.send(results);
      });
    });
  }
);

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
              "INSERT INTO users(email, username, password, role) VALUES(?,?,?, 'client')",
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

router.post("/login", async (req, res) => {
  try {
    const validData = await authSchema.loginSchema.validateAsync(req.body);

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
                  req.session.userId = results[0].id;
                  req.session.name = results[0].username;
                  req.session.role = results[0].role;
                  console.log(`User ${results[0].username} connected!`);
                  connection.destroy();
                  return res
                    .status(200)
                    .send(
                      `User ${req.session.name} Logged In with role of ${req.session.role}`
                    );
                } else {
                  connection.destroy();
                  console.log("Invalid password");
                  return res.status(403).send("Datos incorrectos");
                }
              }
            );
          } else {
            return res.status(403).send("Datos incorrectos");
          }
        }
      );
    });
  } catch (e) {
    if (e.isJoi === true) res.send("Invalid input");
  }
});

//! Methods
//* GenerateJWT
function grantAccess(user) {
  return jwt.sign(user, process.env.SECRET_ACCESS_KEY, {
    expiresIn: "5m",
  });
}

module.exports = router;
