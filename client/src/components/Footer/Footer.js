import React from "react";
import "./Footer.css";

import { FaInstagram } from "react-icons/fa";
function Footer() {
  return (
    <div className="footer container-fluid">
      <div className="items row">
        <div className="copyright col-lg-3">
          {/* <BiCopyright className="copyright-icon" /> */}
          <p className="copyright-year">&copy; {new Date().getFullYear()}</p>
        </div>
        <div className="links col-lg-6">
          <ul className="link-list">
            <li>
              <a className="link" href="/">
                Boutique
              </a>
            </li>
            <li>
              <a className="link" href="/">
                À propos
              </a>
            </li>
            <li>
              <a className="link" href="/">
                Mentions Légales
              </a>
            </li>
            <li>
              <a className="link" href="/">
                Inspiration
              </a>
            </li>
            <li>
              <a className="link" href="/">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="instagram col-lg-3">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <FaInstagram className="insta-icon" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
