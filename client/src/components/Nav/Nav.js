import React, { useState } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { RiShoppingBag2Line, RiContactsBookLine } from "react-icons/ri";
import { BiCartAlt } from "react-icons/bi";
import { GiInspiration } from "react-icons/gi";
import gsap from "gsap";

import Vase from "../../iconComponents/Vase.js";

function Nav() {
  const [open, setOpen] = useState(false);
  function handleClick() {
    const tl = gsap.timeline({
      defaults: {
        duration: 1,
      },
    });
    if (open) {
      setOpen(false);
      tl.to(".links", {
        opacity: 0,
      });
    } else {
      setOpen(true);
      tl.to(".links", {
        opacity: 1,
      });
    }

    console.log("hello world");
  }

  return (
    <div className="nav-container">
      <div className="icon-menu">
        <Vase onClick={handleClick} className="menu" />
      </div>
      <div className="links">
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
      <BiCartAlt className="cart" />
    </div>
  );
}

export default Nav;
