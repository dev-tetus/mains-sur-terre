//Basic modules
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

//Session modules
const redis = require("redis");
const session = require("express-session");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();

//DB module
const pool = require("./config/Db/DBConfig");

//Routes
const products = require("./routes/products");
const auth = require("./routes/auth");

//Middlewares
app.use();
app.use("/products", products);
app.use("/auth", auth);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT;

pool.getConnection((err, connection) => {
  if (err) throw err;
  else console.log("Sucessfully connected!");
  connection.release();
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
