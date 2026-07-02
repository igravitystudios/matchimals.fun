import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import Animals from "../Animals";
import { usePlayerConfig } from "../hooks/players";
import type { DialogProps } from "./types";

const Dialog = ({
  children,
  isVisible,
  hide,
  player = 0,
  style,
}: DialogProps) => {
  const { playerConfig } = usePlayerConfig();
  const Icon = Animals[playerConfig[player].animal];
  const backgroundColor = playerConfig[player].color;
  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      onDismiss={hide}
      onRequestClose={hide}
      transparent
    >
      <View style={styles.modal}>
        <TouchableOpacity
          activeOpacity={1} // No feedback, the modal closing is the feedback
          onPress={hide}
          style={styles.underlay}
        />
        <View style={[styles.dialog, style]}>
          <ScrollView
            contentContainerStyle={{
              paddingTop: 60,
              // react-native-web supports CSS calc() strings; RN's style types
              // don't know about them.
              maxHeight: "calc(100vh - 120px)" as unknown as number,
            }}
          >
            {children}
          </ScrollView>
          <View
            style={[
              styles.animal,
              { backgroundColor: backgroundColor || "gray" },
            ]}
          >
            <Icon width={80} height={80} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // RN 0.85 removed absoluteFillObject; absoluteFill is the same plain object.
  underlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  dialog: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 8,
    marginTop: 60,
  },
  animal: {
    position: "absolute",
    top: -60,
    left: "50%",
    marginLeft: -60,
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: "#fff",
  },
});

export default Dialog;
