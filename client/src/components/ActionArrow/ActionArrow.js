import React from "react";
import "./ActionArrow.css";
import DrawArrow from "../../iconComponents/DrawArrow.js";
import ArrowIcon from "../../iconComponents/ArrowIcon.js";
import { Link } from "react-router-dom";
function ActionArrow() {
  return (
    <div className="arrow-content">
      <div className="arrow-content-box">
        <p className="arrow-text">
          <span id="keyword">Click </span>
          moi pour remonter
        </p>
        <div className="arrow">
          <DrawArrow className="draw-arrow" />
        </div>
        <Link
          to="/home"
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          <ArrowIcon className="icon-arrow" />
        </Link>

        <a
          href="/index.js"
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          <ArrowIcon className="icon-arrow" />
        </a>
      </div>
    </div>
  );
}

export default ActionArrow;
