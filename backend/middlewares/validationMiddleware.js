const express = require("express");
const route = express.Router();

const keys = require("../config/keys");

const authSchema = require("../Helpers/auth_schema");
const Verifier = require("email-verifier");
const verifier = new Verifier(keys.API_KEY_VERIFIER);

const validateUser = async (req, res, next) => {
  try {
    const validData = await authSchema.registerSchema.validateAsync(req.body);
    verifier.verify(validData["email"], async (err, data) => {
      if (err) throw err;
      if (data.dnsCheck === "true") {
        res.locals.email = validData["email"];
        res.locals.username = validData["username"];
        res.locals.password = validData["password"];
      } else {
        res.send("Not valid email");
      }

      next();
    });
  } catch (e) {
    if (e.isJoi === true) res.sendStatus(422);
  }
};
module.exports = {
  validateUser,
};
