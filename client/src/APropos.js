import React from "react";
import Nav from "./components/Nav/Nav.js";

async function fetchData() {
  var data = fetch("/api")
    .then(res => res.json())
    .then(response => { var data = response });

  console.log(data);

}

function APropos() {
  fetchData();
  return (
    <div>
      <Nav />
      <h1>a propos page</h1>
    </div>
  );
}

export default APropos;
