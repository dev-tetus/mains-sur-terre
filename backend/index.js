//Basic modules
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

//Config modules
const pool = require("./config/Db/DBConfig");
const redisModule = require("./config/Redis/redis");
const keys = require("./config/Keys/keys");

//Routes
const products = require("./routes/products");
const auth = require("./routes/auth");
const users = require("./routes/users");

//Middlewares
app.use(redisModule._session); //*Session config for cookies
app.use("/products", products); //*Product routes
app.use("/auth", auth); //*Authentication routes
app.use("/users", users); //*Users routes

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

pool.getConnection((err, connection) => {
  if (err) throw err;
  else console.log("Sucessfully connected!");
  connection.release();
});

app.listen(keys.PORT, () => {
  console.log(`listening on ${keys.PORT}`);
});
