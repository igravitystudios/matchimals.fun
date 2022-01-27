import * as React from "react";
import Svg, { Circle, Path, Ellipse } from "react-native-svg";

export function Bear(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 650.54 575.5"
      {...props}
    >
      <Circle cx={552.87} cy={93.52} r={93.52} fill="#b58d52" />
      <Circle
        cx={543.33}
        cy={97.82}
        r={56.78}
        transform="rotate(-14.79 543.212 97.806)"
        fill="#f2c88a"
      />
      <Circle cx={97.67} cy={93.52} r={93.52} fill="#b58d52" />
      <Circle
        cx={107.21}
        cy={97.82}
        r={56.78}
        transform="rotate(-75.21 107.216 97.817)"
        fill="#f2c88a"
      />
      <Path
        d="M650.54 300.87c0 179.13-145.63 274.63-325.27 274.63S0 480 0 300.87 145.63 1.38 325.27 1.38s325.27 120.39 325.27 299.49z"
        fill="#b58d52"
      />
      <Path
        d="M446.28 458.86c0 57.67-54.18 95.31-121 95.31s-121-37.64-121-95.31 54.18-104.42 121-104.42 121 46.75 121 104.42z"
        fill="#feedc5"
      />
      <Path
        d="M367.23 436.82c0 20-18.78 33.06-42 33.06s-42-13.06-42-33.06 18.79-36.21 42-36.21 42 16.22 42 36.21z"
        fill="#664e29"
      />
      <Path
        fill="none"
        stroke="#664e29"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={12.27}
        d="M325.27 435.81v68.88M266.75 485.47s46.24 63.94 117 0"
      />
      <Ellipse cx={168.64} cy={346.13} rx={40.02} ry={42.2} fill="#664e29" />
      <Ellipse cx={481.9} cy={346.13} rx={40.02} ry={42.2} fill="#664e29" />
    </Svg>
  );
}
