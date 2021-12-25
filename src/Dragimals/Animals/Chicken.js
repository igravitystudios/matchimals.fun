import * as React from "react";
import Svg, { Ellipse, Path, Circle } from "react-native-svg";

export function Chicken(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 638.38 704.51"
      {...props}
    >
      <Ellipse cx={319.19} cy={86.5} rx={47.47} ry={86.5} fill="#ee7b3f" />
      <Ellipse
        cx={250.95}
        cy={103.37}
        rx={41.87}
        ry={76.29}
        transform="rotate(-45 250.957 103.37)"
        fill="#ee7b3f"
      />
      <Ellipse
        cx={387.43}
        cy={103.37}
        rx={76.29}
        ry={41.87}
        transform="rotate(-45 387.428 103.372)"
        fill="#ee7b3f"
      />
      <Path
        d="M638.38 449.47c0 189.76-142.91 255-319.19 255S0 639.23 0 449.47 142.91 105.9 319.19 105.9s319.19 153.82 319.19 343.57z"
        fill="#f6f5e6"
      />
      <Path
        d="M343.33 483.35c0 20.89-10.81 34.93-24.14 34.93s-24.14-14-24.14-34.93 10.81-62.12 24.14-62.12 24.14 41.23 24.14 62.12z"
        fill="#ee7b3f"
      />
      <Path
        d="M378.57 424.65c0 15.39-26.59 27.86-59.38 27.86s-59.38-12.51-59.38-27.86 26.59-40.32 59.38-40.32 59.38 24.94 59.38 40.32z"
        fill="#f2d72b"
      />
      <Circle
        cx={197.88}
        cy={370.83}
        r={35.79}
        transform="rotate(-22.5 197.871 370.834)"
        fill="#664e29"
      />
      <Circle
        cx={440.5}
        cy={370.83}
        r={35.79}
        transform="rotate(-45 440.493 370.832)"
        fill="#664e29"
      />
    </Svg>
  );
}
