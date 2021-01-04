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
const limiter = require("./config/Rate-Limit/rate-limit");

app.set("trust proxy", 1);

//*Error Module
const errorHandler = require("./error/errorHandler");
const ErrorApi = require("./error/ErrorApi");

//*Db test
pool.getConnection((err, connection) => {
  if (err) throw err;
  else console.log("Sucessfully connected!");
  connection.destroy();
});

//Routes
const products = require("./routes/products");
const auth = require("./routes/auth");
const users = require("./routes/users");

//Middlewares
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(redisModule._session); //*Session config for cookies
app.use(limiter);
app.use("/products", products); //*Product routes
app.use("/auth", auth); //*Authentication routes
app.use("/users", users); //*Users routes

//* If route not found
app.use((req, res, next) => {
  next(ErrorApi.badRequest("Not found"));
});

//* Error handler
app.use(errorHandler);

app.listen(keys.PORT, () => {
  console.log(`listening on ${keys.PORT}`);
});
