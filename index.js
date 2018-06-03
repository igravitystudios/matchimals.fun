import { AppRegistry, Platform } from "react-native";
import { Client } from "boardgame.io/react-native";

import App from "./src/App";
import Game from "./src/Game";

const Matchimals = Client({
  board: App,
  game: Game,
  numPlayers: 2,
  debug: false,
});

AppRegistry.registerComponent("matchimals", () => Matchimals);

if (Platform.OS === "web") {
  AppRegistry.runApplication("matchimals", {
    rootTag: document.getElementById("root"),
  });
}
