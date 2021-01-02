class ErrorApi {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
  static badRequest(msg) {
    return new ErrorApi(400, msg);
  }
  static unauthorized(msg) {
    return new ErrorApi(401, msg);
  }
  static forbidden(msg) {
    return new ErrorApi(402, msg);
  }
  static notFound(msg) {
    return new ErrorApi(404, msg);
  }
}

module.exports = ErrorApi;
