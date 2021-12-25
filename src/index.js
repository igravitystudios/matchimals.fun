import { AppRegistry, Platform } from "react-native";
import "react-native-gesture-handler";

import App from "./App";

// import Print from "./Print";

if (Platform.OS === "android") {
  require("babel-polyfill");
}

AppRegistry.registerComponent("matchimals", () => App);

if (Platform.OS === "web") {
  AppRegistry.runApplication("matchimals", {
    rootTag: document.getElementById("root"),
  });
}
