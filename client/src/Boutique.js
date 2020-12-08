import React, { useState, useEffect } from "react";
import "./Boutique.css";
import { createApi } from "unsplash-js";
const nodeFetch = require("node-fetch");
require("dotenv/config");

function Boutique() {
  let [value, setValue] = useState(1);
  let [products, setProducts] = useState([]);

  useEffect(() => {
    var data = fetch(
      "https://api.unsplash.com/search/photos?query=pottery&client_id=YFYbS2VeqC1V0oZ5X3dvr7g7V-VzBB6C-iNrohMM2ws"
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonresponse) => {
        setProducts((products = jsonresponse.results));
      });
  }, []);

  function subValue() {
    setValue(value - 1);
    console.log(value);
  }
  function addValue() {
    setValue(value + 1);
    console.log(value);
  }
  console.log(products);
  return (
    <div className="content-container">
      {products.map((product) => {
        return (
          <div className="card-element">
            <div className="image-container">
              <img src={product.urls.full} alt="" />
            </div>
            <h3>name</h3>
            <div className="quantity-container">
              <button className="btn" onClick={subValue}>
                -
              </button>
              <p>{value}</p>
              <button className="btn" onClick={addValue}>
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Boutique;
