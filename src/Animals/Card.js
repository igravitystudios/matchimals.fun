import React from "react";
import Svg, { Path } from "svgs";

const Card = (props) => (
  <Svg height={140} width={100} viewBox="0 0 100 140" {...props}>
    <Path fill="#f90000" d="M50 70L0 140h100L50 70z" />
    <Path fill="#003bf7" d="M50 70l50-70H0l50 70z" />
    <Path fill="#f2e000" d="M50 70l50 70V0L50 70z" />
    <Path fill="#04a813" d="M50 70L0 0v140l50-70z" />
  </Svg>
);

export default Card;
