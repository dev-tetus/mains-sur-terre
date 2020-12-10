import React from "react";

import Nav from "./components/Nav/Nav.js";
import "./Home.css";

import PageIcon from "./iconComponents/Page.js";
import imageHero from "./images/imgHero.png";
import Vase from "./images/Vase 1.png";
function Home() {
  return (
    <div className="content">
      <div className="section-1">
        <Nav />
        <div className="image-container">
          <img src={imageHero} />
        </div>
        <div className="black">
          <PageIcon className="page-icon" />
        </div>
      </div>
      <div className="section-2">
        <img className="vase" src={Vase} />
        <p id="text-body" className="text-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          consectetur lorem diam, viverra lobortis felis lacinia non. Etiam id
          tincidunt dolor, ac ultrices diam. Donec rutrum eget quam nec
          facilisis. Aenean luctus lorem massa, nec congue ipsum scelerisque
          vitae. Curabitur iaculis, eros eget fringilla accumsan, massa felis
          mattis metus, id suscipit sapien dui ut massa. Sed urna leo,
          pellentesque ac semper sed, luctus in lectus. Phasellus id magna
          ligula.
        </p>
      </div>
    </div>
  );
}

export default Home;
