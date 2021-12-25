import React from "react";
import { ImageBackground } from "react-native";

export function Table({ children, ...rest }) {
  return (
    <ImageBackground
      resizeMode="repeat"
      source={require("./wood-background.jpg")}
      {...rest}
    >
      {children}
    </ImageBackground>
  );
}
