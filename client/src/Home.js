import React from "react";

import Hero from "./components/Hero/Hero.js";
import Description from "./components/Description/Description.js";
import ActionArrow from "./components/ActionArrow/ActionArrow.js";
import Footer from "./components/Footer/Footer.js";

const styled = {};
function Home() {
  return (
    <div>
      <Hero />
      <div className="line">-</div>
      <Description />
      <ActionArrow />
      <Footer />
    </div>
  );
}

export default Home;
