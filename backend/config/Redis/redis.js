const keys = require("../Keys/keys");
const redis = require("redis");
const session = require("express-session");
let RedisStore = require("connect-redis")(session);

const redisClient = redis.createClient({
  port: keys.REDIS.PORT,
  host: keys.REDIS.HOST,
  password: keys.REDIS.PASSWORD,
});
const _session = session({
  name: keys.REDIS.SESSION_NAME,
  store: new RedisStore({ client: redisClient }),
  secret: keys.REDIS.SECRET_KEY,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 1000 * 60 * 15,
  },
});

module.exports = {
  redisClient,
  _session,
};
