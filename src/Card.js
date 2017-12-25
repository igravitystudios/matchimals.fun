import React from "react";
import data from "./data";

const Card = ({ width, height, card }) => (
  <div
    style={{ position: "relative", display: "inline-flex", overflow: "hidden" }}
  >
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 140"
    >
      <polygon id="top" points="50 70 100 0 0 0 50 70" fill="#fff" />
      <polygon id="right" points="50 70 100 140 100 0 50 70" />
      <polygon id="bottom" points="50 70 0 140 100 140 50 70" />
      <polygon id="left" points="50 70 0 0 0 140 50 70" />
    </svg>
    <div
      style={{
        position: "absolute",
        top: -16,
        left: 9,
        width: 32,
        height: 32,
        backgroundImage: `url(${data.animals[card.top]})`,
        backgroundSize: "32px 32px"
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 19,
        right: -16,
        width: 32,
        height: 32,
        backgroundImage: `url(${data.animals[card.right]})`,
        backgroundSize: "32px 32px"
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: -16,
        left: 9,
        width: 32,
        height: 32,
        backgroundImage: `url(${data.animals[card.bottom]})`,
        backgroundSize: "32px 32px"
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 19,
        left: -16,
        width: 32,
        height: 32,
        backgroundImage: `url(${data.animals[card.left]})`,
        backgroundSize: "32px 32px"
      }}
    />
  </div>
);

Card.defaultProps = {
  width: 50,
  height: 70,
  card: {}
};

export default Card;
