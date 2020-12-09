import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { RiShoppingBag2Line } from "react-icons/ri";
import MenuIcon from "../../iconComponents/MenuIcon.js";
function Nav() {
  return (
    <div className="nav-container">
      <div className="icon-menu">
        <MenuIcon />
      </div>
      <div className="links">
        <Link className="link" to="/boutique">
          <RiShoppingBag2Line className="icon" />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
