import type { StyleProp, ViewStyle } from "react-native";
import type { PlayerState } from "../Matchimals/game";
import type { PlayerId } from "../hooks/players";

// Shared between the native (Animated) and web (static styles) variants so
// both stay call-compatible.
export interface NameplateProps {
  player: PlayerId;
  players: Record<string, PlayerState>;
  currentPlayer: PlayerId;
  style?: StyleProp<ViewStyle>;
}
