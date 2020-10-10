import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

import Animals from "../Animals";
import Button from "../Button";
import colors from "../constants/colors";
import { usePlayerConfig } from "../hooks/players";

const Dialog = ({ children, isVisible, hide, player = 0, style }) => {
  const { playerConfig } = usePlayerConfig();
  const Icon = Animals[playerConfig[player].animal];
  const backgroundColor = playerConfig[player].color;
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={hide}
      onBackdropPress={hide}
      onSwipeComplete={hide}
      style={styles.modal}
    >
      <View style={[styles.dialog, style]}>
        <ScrollView contentContainerStyle={{ paddingTop: 60 }}>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
  dialog: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 8,
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
