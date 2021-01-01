const pool = require("../config/Db/DBConfig");
const bcrypt = require("bcrypt");
const keys = require("../config/Keys/keys");
const authSchema = require("../Helpers/auth_schema"); //* Product data validation

//* Register user
const register = async (req, res) => {
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
};

//* Login user
async function login(req, res) {
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
    throw e;
  }
}

///*Logout
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res
      .clearCookie(keys.REDIS.SESSION_NAME)
      .send(`User logged out`)
      .status(200);
  });
};

module.exports = { register, login, logout };
