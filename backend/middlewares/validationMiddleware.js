require("dotenv").config();

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
module.exports = {
  validateUser,
};
