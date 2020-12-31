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

//Session modules
const redis = require("redis");
const session = require("express-session");
let RedisStore = require("connect-redis")(session);

//Routes
const products = require("./routes/products");
const auth = require("./routes/auth");

//Middlewares
app.use(
  session({
    store: new RedisStore({ client: redisModule.redisClient }),
    secret: "testSecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    },
  })
);
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
