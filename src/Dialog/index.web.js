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

const Dialog = ({ children, isVisible, hide, player = 0, style }) => {
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
              maxHeight: "calc(100vh - 120px)",
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
  underlay: {
    ...StyleSheet.absoluteFillObject,
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
