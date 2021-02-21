const ErrorApi = require("./ErrorApi");

module.exports = errorHandler = (error, req, res, next) => {
  if (error instanceof ErrorApi) {
    return res
      .json({
        message: error.message,
      })
      .status(error.code);
  }
};
