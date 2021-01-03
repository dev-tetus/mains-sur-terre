const rateLimiter = require("express-rate-limit");

module.exports = limiter = rateLimiter({
  windowMs: 1000 * 60 * 3,
  max: 15,
  message: "Too many requests",
  statusCode: 429,
});
