import React, { useCallback, useEffect } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Client } from "boardgame.io/react-native";
import { colors } from "./constants/colors";

import Matchimals from "./Matchimals";
import game from "./Matchimals/game";
import MainMenu from "./MainMenu";
import { MusicProvider } from "./Music";
import { PlayerProvider } from "./hooks/players";

export default function App() {
  const [isMainMenuVisible, setIsMainMenuVisible] = React.useState(true);
  const [numPlayers, setNumPlayers] = React.useState(1);

  const [numGamesPlayed, setNumGamesPlayed] = React.useState("0");
  const {
    getItem: getAsyncNumGamesPlayed,
    setItem: setAsyncNumGamesPlayed,
  } = useAsyncStorage("numGamesPlayed");

  const onMount = async () => {
    const asyncNumGamesPlayed = await getAsyncNumGamesPlayed();

    setNumGamesPlayed(asyncNumGamesPlayed);
  };

  const handleIncrementGamesPlayed = useCallback(() => {
    const stringNumberWow = `${Number(numGamesPlayed) + 1}`;
    console.log("You are playing Game Number: " + stringNumberWow);
    setNumGamesPlayed(stringNumberWow);
    setAsyncNumGamesPlayed(stringNumberWow);
  }, [numGamesPlayed, setNumGamesPlayed, setAsyncNumGamesPlayed]);

  useEffect(() => {
    onMount();
  });

  const backToMainMenu = useCallback(() => {
    setIsMainMenuVisible(true);
  }, [setIsMainMenuVisible]);

  const startGame = useCallback(
    (numPlayers) => {
      setNumPlayers(numPlayers);
      setIsMainMenuVisible(false);
      handleIncrementGamesPlayed();
    },
    [handleIncrementGamesPlayed, setIsMainMenuVisible, setNumPlayers]
  );

  const MatchimalsClient = Client({
    board: Matchimals,
    game,
    numPlayers,
    debug: false,
  });

  return (
    <SafeAreaProvider>
      <MusicProvider>
        <PlayerProvider>
          <View style={styles.root}>
            <StatusBar hidden />
            {isMainMenuVisible ? (
              <MainMenu startGame={startGame} />
            ) : (
              <MatchimalsClient backToMainMenu={backToMainMenu} />
            )}
          </View>
        </PlayerProvider>
      </MusicProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    position: "relative",
    width: "100%",
    height: Platform.OS === "web" ? "100vh" : "100%",
    overflow: "hidden",
    backgroundColor: colors.grayDark,
  },
});
