import * as React from "react";

function SvgFirstCircles(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 292 681"
      {...props}
    >
      <defs>
        <linearGradient
          id="first-circles_svg__b"
          x1={1.066}
          y1={0.475}
          x2={-1.195}
          y2={0.705}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#02040f" />
          <stop offset={1} stopColor="#cba454" stopOpacity={0.871} />
        </linearGradient>
        <clipPath id="first-circles_svg__a">
          <path fill="none" d="M0 43h292v681H0z" />
        </clipPath>
      </defs>
      <g
        data-name="Grupo de desplazamiento 1"
        transform="translate(0 -43)"
        clipPath="url(#first-circles_svg__a)"
        style={{
          isolation: "isolate",
        }}
      >
        <path
          data-name="Uni\xF3n 1"
          d="M18 519.5c0-78.033 42.043-145.493 103.081-177.573A226.433 226.433 0 0186 220.5C86 94.855 187.855-7 313.5-7S541 94.855 541 220.5c0 106.174-72.727 195.359-171.086 220.451A209.773 209.773 0 01385 519.5C385 628.576 302.845 717 201.5 717S18 628.576 18 519.5z"
          transform="translate(-18 7)"
          fill="url(#first-circles_svg__b)"
        />
      </g>
    </svg>
  );
}

export default SvgFirstCircles;
