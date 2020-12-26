const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const pool = require("./dbconfig");

const products = require("./routes/products");
const auth = require("./routes/auth");

app.use("/products", products);
app.use("/auth", auth);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3001;

pool.getConnection((err, connection) => {
  if (err) throw err;
  else console.log("Sucessfully connected!");
  connection.release();
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
