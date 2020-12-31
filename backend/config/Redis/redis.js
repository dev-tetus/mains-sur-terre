const keys = require("../Keys/keys");
const redis = require("redis");

const redisClient = redis.createClient({
  port: keys.REDIS.PORT,
  host: keys.REDIS.HOST,
  password: keys.REDIS.PASSWORD,
});

module.exports = {
  redisClient,
};
