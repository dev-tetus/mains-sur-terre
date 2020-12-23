const mysqlx = require("@mysql/xdevapi");

const keys = require("./config/prod");

const config = {
  host: keys.DB_HOST,
  user: keys.DB_USER,
  password: keys.DB_PASSWORD,
  database: keys.DB_NAME,
};

const client = mysqlx.getSession(config).then((session) => {
  console.log(session.inspect()); // { user: 'root', host: 'localhost', port: 33060 }
});

module.exports = { client };
