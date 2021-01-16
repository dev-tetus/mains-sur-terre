const pool = require("../config/Db/DBConfig");
const bcrypt = require("bcrypt");
const keys = require("../config/Keys/keys");
const authSchema = require("../Helpers/auth_schema"); //* Product data validation

//*Error Module
const ErrorApi = require("../error/ErrorApi");

//* Register user
const register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(res.locals.password, 10);
    pool.getConnection((err, connection) => {
      if (err) return next(ErrorApi.internalError());
      connection.query(
        "SELECT * FROM users WHERE username = ? || email = ?",
        [res.locals.username, res.locals.email],
        (err, results) => {
          if (err) return next(ErrorApi.internalError());
          if (Object.keys(results).length === 0) {
            connection.query(
              "INSERT INTO users(email, username, password, role) VALUES(?,?,?, 'client')",
              [res.locals.email, res.locals.username, hashedPassword],
              (err, results) => {
                if (err) return next(ErrorApi.internalError());
                connection.destroy();
                return res.send(`User ${res.locals.username} created`);
              }
            );
          } else {
            if (results[0].email === res.locals.email) {
              connection.destroy();
              return next(ErrorApi.badRequest("User already registered"));
            } else {
              connection.destroy();
              return next(ErrorApi.badRequest("Username already taken"));
            }
          }
        }
      );
    });
  } catch (e) {
    if (e) next(ErrorApi.internalError());
  }
};

//* Login user
const login = async (req, res, next) => {
  try {
    const validData = await authSchema.loginSchema.validateAsync(req.body);
    pool.getConnection((err, connection) => {
      if (err) next(ErrorApi.internalError());
      connection.query(
        "SELECT * FROM users WHERE username = ? OR email = ?",
        [validData["username"], validData["username"]],
        (err, results) => {
          if (err) return next(ErrorApi.internalError());
          if (results.length > 0) {
            bcrypt.compare(
              validData["password"],
              results[0].password,
              (err, same) => {
                if (err) next(ErrorApi.internalError());
                if (same) {
                  req.session.userId = results[0].id;
                  req.session.name = results[0].username;
                  req.session.role = results[0].role;
                  console.log(`User ${results[0].username} connected!`);
                  connection.destroy();
                  return res.status(200).json({
                    id: results[0].id,
                    username: results[0].username,
                  });
                } else {
                  connection.destroy();
                  console.log("Invalid password");
                  return next(ErrorApi.badRequest("Invalid Input"));
                }
              }
            );
          } else return next(ErrorApi.badRequest("Invalid Input"));
        }
      );
    });
  } catch (e) {
    if (e.isJoi === true) return next(ErrorApi.badRequest("Invalid input"));
    else return next(ErrorApi.internalError());
  }
};

///*Logout
const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(ErrorApi.internalError());
    return res
      .clearCookie(keys.REDIS.SESSION_NAME)
      .send(`User logged out`)
      .status(200);
  });
};

//*Is user loggedIn
const session = (req, res, next) => {
  if (req.session && req.session.userId) {
    pool.getConnection((err, connection) => {
      if (err) next(ErrorApi.internalError());
      connection.query(
        "SELECT * FROM users WHERE id = ? ",
        req.session.userId,
        (err, results) => {
          if (err) return next(ErrorApi.internalError());
          if (results.length > 0) {
            connection.destroy();
            return res.status(200).json({
              id: results[0].id,
              username: results[0].username,
            });
          } else {
            connection.destroy();
            return next(ErrorApi.notFound("User not found in db"));
          }
        }
      );
    });
  } else {
    const error = ErrorApi.notFound("No current session persisted");
    return next(error);
  }
};

module.exports = { register, login, logout, session };
