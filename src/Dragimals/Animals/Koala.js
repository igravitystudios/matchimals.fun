import * as React from "react";
import Svg, { Circle, Path, Ellipse } from "react-native-svg";

export function Koala(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 838.58 565.04"
      {...props}
    >
      <Circle
        cx={679.77}
        cy={158.81}
        r={158.81}
        transform="rotate(-45 679.768 158.801)"
        fill="#afb8c1"
      />
      <Circle
        cx={670.41}
        cy={165.91}
        r={110.32}
        transform="rotate(-45 670.414 165.915)"
        fill="#edf7fc"
      />
      <Circle
        cx={158.81}
        cy={158.81}
        r={158.81}
        transform="rotate(-45 158.81 158.808)"
        fill="#afb8c1"
      />
      <Circle
        cx={168.17}
        cy={165.91}
        r={110.32}
        transform="rotate(-45 168.172 165.91)"
        fill="#edf7fc"
      />
      <Path
        d="M704.49 326c0 157.51-127.69 239-285.2 239s-285.2-81.49-285.2-239S261.78 40.85 419.29 40.85 704.49 168.53 704.49 326z"
        fill="#afb8c1"
      />
      <Path
        d="M486.28 411.16c0 37-30 56.14-67 56.14s-67-19.14-67-56.14 30-84.55 67-84.55 67 47.56 67 84.55z"
        fill="#505050"
      />
      <Ellipse cx={276.41} cy={340.63} rx={33.76} ry={37.68} fill="#606060" />
      <Ellipse cx={562.17} cy={340.63} rx={33.76} ry={37.68} fill="#606060" />
    </Svg>
  );
}
