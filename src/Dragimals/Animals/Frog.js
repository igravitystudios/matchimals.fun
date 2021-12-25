import * as React from "react";
import Svg, { Path, Circle, Ellipse } from "react-native-svg";

export function Frog(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 632.06 476.69"
      {...props}
    >
      <Path
        d="M629.89 309.5c0 128.76-140.52 165-313.86 165S2.17 438.26 2.17 309.5 142.69 76.37 316 76.37 629.89 180.75 629.89 309.5z"
        fill="#b6ce6a"
        stroke="#b6ce6a"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4.35}
      />
      <Circle
        cx={484.33}
        cy={107.95}
        r={105.66}
        transform="rotate(-45 484.332 107.943)"
        fill="#b6ce6a"
        stroke="#b6ce6a"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4.57}
      />
      <Path
        d="M437.1 131.56a49.5 49.5 0 0062.61 31.79 50 50 0 0031.85-62.93A49.51 49.51 0 00469 68.63a50 50 0 00-31.9 62.93z"
        fill="#69793d"
      />
      <Circle
        cx={146.04}
        cy={107.95}
        r={105.66}
        transform="rotate(-45 146.035 107.95)"
        fill="#b6ce6a"
        stroke="#b6ce6a"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4.57}
      />
      <Ellipse
        cx={146.04}
        cy={115.99}
        rx={49.65}
        ry={49.87}
        transform="rotate(-18.23 145.987 115.964)"
        fill="#69793d"
      />
      <Path
        fill="none"
        stroke="#69793d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={14.62}
        d="M143.39 267.84l171.23 94.08 172.36-96.31"
      />
      <Circle cx={284.81} cy={255.92} r={11.39} fill="#69793d" />
      <Circle cx={345.56} cy={255.92} r={11.39} fill="#69793d" />
    </Svg>
  );
}
