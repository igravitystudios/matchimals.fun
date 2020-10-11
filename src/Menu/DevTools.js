import React from "react";
import { View } from "react-native";
import Button from "../Button";
import CircleButton from "../CircleButton";

export const DevTools = ({ moves }) => {
  return (
    <View style={{ alignItems: "center", marginTop: 48 }}>
      <View style={{ flexDirection: "row" }}>
        <Button
          onPress={() => {
            moves.takeSnapshot();
          }}
        >
          Take Snapshot
        </Button>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <CircleButton
          onPress={() => {
            moves.restoreSnapshot("twoPlayerA");
          }}
        >
          2A
        </CircleButton>
        <CircleButton
          onPress={() => {
            moves.restoreSnapshot("twoPlayerB");
          }}
        >
          2B
        </CircleButton>
        <CircleButton
          onPress={() => {
            moves.restoreSnapshot("twoPlayerC");
          }}
        >
          2C
        </CircleButton>
        <CircleButton
          onPress={() => {
            moves.restoreSnapshot("twoPlayerD");
          }}
        >
          2D
        </CircleButton>
        <CircleButton
          onPress={() => {
            moves.restoreSnapshot("twoPlayerE");
          }}
        >
          2E
        </CircleButton>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <CircleButton
          onPress={() => {
            moves.restoreSnapshot("fourPlayerA");
          }}
        >
          4A
        </CircleButton>
        <CircleButton
          onPress={() => {
            moves.restoreSnapshot("fourPlayerB");
          }}
        >
          4B
        </CircleButton>
        <CircleButton
          onPress={() => {
            moves.restoreSnapshot("fourPlayerC");
          }}
        >
          4C
        </CircleButton>
        <CircleButton
          onPress={() => {
            moves.restoreSnapshot("fourPlayerD");
          }}
        >
          4D
        </CircleButton>
        <CircleButton
          onPress={() => {
            moves.restoreSnapshot("fourPlayerE");
          }}
        >
          4E
        </CircleButton>
      </View>
    </View>
  );
};
