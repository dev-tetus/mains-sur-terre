import React from "react";
import "./Nav.css";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <div className="container-fluid header">
      <div className="row">
        <div className="col-md-6 col-lg-6 columna">
          <div className="logo"></div>
        </div>
        <div className="col-md-6 col-lg-6 columna">
          <ul className="nav-items">
            <Link className="link" to="/boutique">
              <li className="item">E-Shop</li>
            </Link>
            <Link className="link" to="/apropos">
              <li className="item">À Propos</li>
            </Link>
            <Link className="link" to="/inspiration">
              <li className="item">Insipiration</li>
            </Link>
            <Link className="link" to="/contact">
              <li className="item">Contact</li>
            </Link>
            <li className="item">
              <p>2</p>
              <FiShoppingCart className="cart" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
