import React from "react";
import "./Description.css";
import Image1 from "../../assets/imageDescription1.png";
import Image2 from "../../assets/imageDescription2.png";

import Arrow from "../../iconComponents/DelimiterArrow.js";

function Description() {
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="delimiter">
          <Arrow id="arrow" className="arrow-1" />
          <Arrow id="arrow" className="arrow-2" />
          <Arrow id="arrow" className="arrow-3" />
          <Arrow id="arrow" className="arrow-4" />
          <div className="line-arrow"></div>
        </div>
      </div>

      <h2 className="title-description">Brève Description</h2>
      <div className="content container">
        <div className="content-1 row">
          <div className="col-lg-6">
            <p id="content-text" className="content-text-1">
              Pièces <span id="keyword">uniques</span> fabriquées en Bretagne,
              façonées à la main ou au tour du potier
            </p>
          </div>
          <div className="col-lg-6">
            <img src={Image1} alt="content-1" />
          </div>
        </div>
        <div className="content-2 row">
          <div className="col-lg-6">
            <img src={Image2} alt="content-1" />
          </div>
          <div className="col-lg-6">
            <p id="content-text" className="content-text-2">
              Mes grès conviennent de carrières françaises et ma porcelaine
              d’Angleterre. Je <span id="keyword">recycle </span>
              consciencieusement chacune de mes terres
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid carousel-images">
        <div className="row-images row">
          <img className="col-lg-3" src={Image1} alt="content-1" />
          <img className="col-lg-3" src={Image1} alt="content-1" />
          <img className="col-lg-3" src={Image1} alt="content-1" />
        </div>
        <div />
        <p id="content-text" className="text-carousel">
          Des poteries <span id="keyword">utilitaires</span> ou
          <span id="keyword"> décoratives </span>
          en grès, porcelaine ou raku
        </p>
      </div>
    </div>
  );
}

export default Description;
