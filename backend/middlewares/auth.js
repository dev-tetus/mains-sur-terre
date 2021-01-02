const keys = require("../config/Keys/keys");
const ErrorApi = require("../error/ErrorApi");

//* Authenticate User
const authenticateUser = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return next(ErrorApi.unauthorized("user not authenticated"));
  }
  return next();
};

//* Role Validation
const validateRole = (role) => {
  return (req, res, next) => {
    if (req.session.role !== role)
      return next(ErrorApi.forbidden("You have no access"));
    return next();
  };
};

//* Redirect to log in
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    return next(ErrorApi.badRequest("User must be logged in"));
  }
  return next();
};

//* Is user logged in
const isLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    return next(
      ErrorApi.badRequest(`You are already connected as ${req.session.name}`)
    );
  }
  return next();
};
module.exports = {
  authenticateUser,
  validateRole,
  redirectLogin,
  isLoggedIn,
};
