const keys = require("../config/Keys/keys");

//* Authenticate User
const authenticateUser = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    const err = new Error("not authenticated"); //TODO: error handler
    return next(err);
  }
  return next();
};

//* Role Validation
const validateRole = (role) => {
  return (req, res, next) => {
    if (req.session.role !== role)
      return res.status(403).send("You have no access!!");

    return next();
  };
};

//* Redirect to log in
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.send("User must be logged in"); //TODO: error handler
  }
  return next();
};
//TODO: 👆 and 👇 same
//* Is user logged in
const isLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    return res.send(`You are already connected as ${req.session.name}`); //TODO: error handler
  }

  return next();
};
module.exports = {
  authenticateUser,
  validateRole,
  redirectLogin,
  isLoggedIn,
};
