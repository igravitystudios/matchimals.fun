import React from "react";
import Svg, { Circle, G, Line, Path, Rect } from "svgs";

import { colors } from "../constants/colors";

interface MusicNoteIconProps {
  muted?: boolean;
  size?: number;
}

// A beamed pair of eighth notes; muted renders it dimmed with a slash
const MusicNoteIcon = ({ muted, size = 32 }: MusicNoteIconProps) => (
  <Svg title="Music" width={size} height={size} viewBox="0 0 32 32">
    <G opacity={muted ? 0.4 : 1}>
      <Path fill={colors.grayDark} d="M10.5 5L28.5 3v6l-18 2z" />
      <Rect fill={colors.grayDark} x={10.5} y={5} width={3} height={20} />
      <Rect fill={colors.grayDark} x={25.5} y={3} width={3} height={20} />
      <Circle fill={colors.grayDark} cx={9} cy={25} r={4.5} />
      <Circle fill={colors.grayDark} cx={24} cy={23} r={4.5} />
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

export default MusicNoteIcon;
