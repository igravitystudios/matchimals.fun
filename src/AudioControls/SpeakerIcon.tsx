import React from "react";
import Svg, { G, Line, Path } from "svgs";

import { colors } from "../constants/colors";

interface SpeakerIconProps {
  muted?: boolean;
  size?: number;
}

// A speaker with sound waves; muted renders it dimmed with a slash
const SpeakerIcon = ({ muted, size = 32 }: SpeakerIconProps) => (
  <Svg title="Sound effects" width={size} height={size} viewBox="0 0 32 32">
    <G opacity={muted ? 0.4 : 1}>
      <Path fill={colors.grayDark} d="M3 11.5h5.5l8-7v23l-8-7H3z" />
      <Path
        fill="none"
        stroke={colors.grayDark}
        strokeWidth={3}
        strokeLinecap="round"
        d="M21.5 11.5a6.5 6.5 0 0 1 0 9"
      />
      <Path
        fill="none"
        stroke={colors.grayDark}
        strokeWidth={3}
        strokeLinecap="round"
        d="M25.5 7.5a11 11 0 0 1 0 17"
      />
    </G>
    {muted && (
      <Line
        x1={4}
        y1={4}
        x2={28}
        y2={28}
        stroke={colors.grayDark}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    )}
  </Svg>
);

export default SpeakerIcon;
