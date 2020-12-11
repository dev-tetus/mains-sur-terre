import React, { useState } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { RiShoppingBag2Line, RiContactsBookLine } from "react-icons/ri";
import { BiCartAlt } from "react-icons/bi";
import { GiInspiration } from "react-icons/gi";
import gsap from "gsap";

import Vase from "../../iconComponents/Vase.js";
import Circle from "../../iconComponents/Circle.js";

function Nav() {
  const tl = gsap.timeline({
    defaults: {
      duration: 1,
    },
  });

  const [open, setOpen] = useState(false);

  // window.addEventListener('click', () => {
  //   const tl = gsap.timeline({
  //     defaults: {
  //       duration: 1,
  //     },
  //   });
  //   if (open) {
  //     setOpen(false);
  //     tl.to(".links", {
  //       opacity: 0,
  //     });
  //   }

  // })


  function handleClick() {
    if (open) {
      setOpen(false);
      tl.to(".menu", {
        rotateZ: 0,
        duration: 0.5,
      }).to(
        ".links",
        {
          pointerEvents: "none",
          opacity: 0,
        },
        "-=1s"
      );
    } else {
      setOpen(true);

      tl.to(".menu", {
        rotateZ: 90,
        duration: 0.5,
      }).to(
        ".links",
        {
          pointerEvents: "auto",
          opacity: 1,
        },
        "-=0.2s"
      );
    }

    console.log("hello world");
  }

  return (
    <div className="nav-container">
      <div className="icon-menu">
        <Vase onClick={handleClick} className="menu" />
      </div>
      <div className="links">
        <div className="icons">
          <div className="link-container">
            <Link className="link" to="/contact">
              <RiContactsBookLine className="icon" />
            </Link>
          </div>

          <div className="line"></div>
          <div className="link-container">
            <Link className="link" to="/boutique">
              <RiShoppingBag2Line className="icon" />
            </Link>
          </div>
          <div className="line"></div>
          <div className="link-container">
            <Link className="link" to="/inspiration">
              <GiInspiration className="icon" />
            </Link>
          </div>
        </div>

        <div className="words">
          <p>Contact</p>
          <p>Shop</p>
          <p>Inspiration</p>
        </div>
      </div>
      <BiCartAlt className="cart" />
    </div>
  );
}

export default Nav;
