const ErrorApi = require("./ErrorApi");

module.exports = errorHandler = (error, req, res, next) => {
  if (error instanceof ErrorApi) {
    res.status(error.code).json({
      message: error.message,
    });
  } else {
    res.status(500).json({
      message: "something went wrong",
    });
  }
};
