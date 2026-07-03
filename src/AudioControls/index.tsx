import React from "react";
import { StyleSheet, View } from "react-native";
import type { ViewProps } from "react-native";

import CircleButton from "../CircleButton";
import { useMusic } from "../Music";
import MusicNoteIcon from "./MusicNoteIcon";
import SpeakerIcon from "./SpeakerIcon";

// The music + sound-effects toggle buttons, shown on the main menu and in
// the in-game menu
const AudioControls = ({ style, ...rest }: ViewProps) => {
  const music = useMusic();

  return (
    <View style={[styles.row, style]} {...rest}>
      <CircleButton
        accessibilityLabel={
          music.musicEnabled ? "Turn music off" : "Turn music on"
        }
        onPress={() => music.setMusicEnabled(!music.musicEnabled)}
      >
        <MusicNoteIcon muted={!music.musicEnabled} />
      </CircleButton>
      <CircleButton
        accessibilityLabel={
          music.soundEffectsEnabled
            ? "Turn sound effects off"
            : "Turn sound effects on"
        }
        onPress={() => music.setSoundEffectsEnabled(!music.soundEffectsEnabled)}
      >
        <SpeakerIcon muted={!music.soundEffectsEnabled} />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
  },
});

export default AudioControls;
