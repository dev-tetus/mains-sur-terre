const mysqlx = require("@mysql/xdevapi");
const dotenv = require("dotenv");
const keys = require("./config/prod");

const config = {
  host: keys.DB_HOST,
  user: keys.DB_USER,
  password: keys.DB_PASSWORD,
  database: keys.DB_NAME,
};

const client = mysqlx.getClient(config, {
  pooling: { enabled: true, maxSize: 10 },
});
client.getSession().then((session) => {
  console.log(session.inspect());
});

module.exports = { db };
