import * as React from "react";

function SvgSecondCircles(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 396.294 849.468"
      {...props}
    >
      <defs>
        <linearGradient
          id="second-circles_svg__b"
          x1={1.066}
          y1={0.475}
          x2={-1.195}
          y2={0.705}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#02040f" />
          <stop offset={1} stopColor="#cba454" stopOpacity={0.871} />
        </linearGradient>
        <clipPath id="second-circles_svg__a">
          <path fill="none" d="M455 0h396.294v849.468H455z" />
        </clipPath>
      </defs>
      <g
        data-name="2n circles"
        transform="translate(-455)"
        clipPath="url(#second-circles_svg__a)"
        style={{
          isolation: "isolate",
        }}
      >
        <path
          data-name="Uni\xF3n 2"
          d="M-69.8 483.944c0-109.076 82.156-197.5 183.5-197.5a171.606 171.606 0 0162.225 11.645A182.169 182.169 0 01173 265.5C173 164.708 255.38 83 357 83s184 81.708 184 182.5S458.62 448 357 448a184.942 184.942 0 01-65.2-11.787 212.321 212.321 0 015.4 47.732c0 109.076-82.156 197.5-183.5 197.5S-69.8 593.021-69.8 483.944z"
          transform="scale(-1) rotate(-39 -1235.001 912.984)"
          fill="url(#second-circles_svg__b)"
        />
      </g>
    </svg>
  );
}

export default SvgSecondCircles;
