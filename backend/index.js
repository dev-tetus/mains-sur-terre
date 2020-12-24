const express = require("express");

const app = express();
const cors = require("cors");
require("dotenv").config();

const pool = require('./dbconfig')

const products = require('./routes/products');

app.use("/products", products);

const port = process.env.PORT || 3001;

app.use(cors());



pool.getConnection((err, connection) => {
  if (err) throw err;
  else console.log("Sucessfully connected!");
  connection.release();
})



app.listen(port, () => {
  console.log(`listening on ${port}`);
});

