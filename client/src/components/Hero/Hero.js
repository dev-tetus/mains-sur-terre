import React, { Component, useEffect } from "react";
import "./Hero.css";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";

import gsap from "gsap";
function Hero() {
  useEffect(() => {
    const tl = gsap.timeline();
    const title = document.querySelector(".title");
    const title2 = document.querySelector(".title-2");
    const titleText = document.querySelector(".title-text");
    tl.to(title, {
      x: 150,
      opacity: 1,
      duration: 1.2,
    });
    tl.to(
      title2,
      {
        opacity: 1,
        x: 150,
        duration: 2,
      },
      "-=0.8"
    );
    tl.to(
      titleText,
      {
        opacity: 1,
        x: 150,
        duration: 2,
      },
      "-=2"
    );
  }, []);

  return (
    <div className="container-fluid container-hero">
      {/* <p className="terre">TERRE</p> */}

      <div className="container container-content">
        <h1 className="title">
          Les <span>pieds</span> mains sur <span id="keyword">terre</span>
        </h1>
        <h2 className="title-2">Une collection sans précedent</h2>
        <p className="title-text">
          Ne pas se laisser séduire par des ambitions démesurées, insoutenables
          pour la planète en gardant toutefois un peu la tête dans les nuages,
          dans les rêves de l’enfance.
        </p>
        <div className="call-to-action">
          <h2 className="call-to-action-title">Découvre ce que je fais</h2>

          <Arrow id="default" />
          <Arrow id="default" />
          <Arrow id="default" />

          <button className="call-to-action-button">Catalogue</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
