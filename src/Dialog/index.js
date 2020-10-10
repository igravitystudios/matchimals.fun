import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Animals from "../Animals";
import { usePlayerConfig } from "../hooks/players";

const Dialog = ({ children, isVisible, hide, player = 0, style }) => {
  const insets = useSafeAreaInsets();
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
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
    >
      <View
        style={[
          styles.dialog,
          { marginTop: insets.top + 60, marginBottom: insets.bottom },
          style,
        ]}
      >
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
    marginLeft: -52, // account for border
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
