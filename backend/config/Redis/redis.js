const keys = require("../Keys/keys");
const redis = require("redis");

export const redisClient = redis.createClient(keys.REDIS);
