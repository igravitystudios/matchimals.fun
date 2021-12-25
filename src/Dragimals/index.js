import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import * as Animals from "./Animals";
import { Puck } from "./Puck";
import { Table } from "./Table";
import { Toggle } from "./Toggle";

function Dragimals() {
  const [active, setActive] = useState("Chris");

  return (
    <Table style={styles.root}>
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          {Object.keys(Animals).map((animal) => {
            return <Puck animal={animal} active={active} key={animal} />;
          })}
        </View>
        <Toggle active={active} setActive={setActive} />
      </SafeAreaView>
    </Table>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: 128 * 4,
  },
});

export default Dragimals;
