require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const route = express.Router();

const keys = require("../config/Keys/keys");

const authSchema = require("../Helpers/auth_schema");
const Verifier = require("email-verifier");
const verifier = new Verifier(keys.MAIL_VERIFIER.API_KEY);

//*User input validation
const validateUser = async (req, res, next) => {
  try {
    const validData = await authSchema.registerSchema.validateAsync(req.body);
    verifier.verify(validData["email"], async (err, data) => {
      if (err) throw err;

      if (data.smtpCheck === "true") {
        res.locals.email = validData["email"];
        res.locals.username = validData["username"];
        res.locals.password = validData["password"];
        next();
      } else {
        res.send("Not valid email");
      }
    });
  } catch (e) {
    if (e.isJoi === true) res.sendStatus(422);
  }
};

// //* Token to request variable middleware
// const refreshTokenRequest = (req, res, next) => {
//   const bearerHeader = req.headers["authorization"];

//   if (typeof bearerHeader !== "undefined") {
//     req.token = bearerHeader.split(" ")[1];
//     next();
//   } else return res.sendStatus(401);
// };
// //* Token authentication
// const authenticateToken = (req, res, next) => {
//   const bearerHeader = req.headers["authorization"];
//   if (typeof bearerHeader !== "undefined") {
//     const token = bearerHeader.split(" ")[1];
//     jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, response) => {
//       if (err) return res.sendStatus(403);

//       const user = {
//         username: response.username,
//         email: response.email,
//         role: response.role,
//       };
//       req.data = user;

//       next();
//     });
//   } else return res.sendStatus(401);
// };

//* Authenticate User
const authenticateUser = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    const err = new Error("not authenticated");
    next(err);
  }
  next();
};
//* Role Validation
function validateRole(role) {
  return (req, res, next) => {
    if (req.session.role !== role)
      return res.send("You have no access!!").status(403);

    next();
  };
}
module.exports = {
  validateUser,
  // authenticateToken,
  validateRole,
  // refreshTokenRequest,
  authenticateUser,
};
