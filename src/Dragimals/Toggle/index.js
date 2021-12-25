import React from "react";
import { TouchableOpacity, View } from "react-native";

import { Dada } from "./Dada";
import { Mama } from "./Mama";

export function Toggle({ active, setActive, style }) {
  return (
    <View
      style={[
        {
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          // padding: 16,
        },
        style,
      ]}
    >
      <TouchableOpacity activeOpacity={1} onPress={() => setActive("Hannah")}>
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#eaeaea",
            opacity: active === "Hannah" ? 1 : 0.5,
          }}
        >
          <Mama width={80} height={80} />
        </View>
      </TouchableOpacity>
      <View style={{ width: 12, height: 0 }}></View>
      <TouchableOpacity activeOpacity={1} onPress={() => setActive("Chris")}>
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#eaeaea",
            opacity: active === "Chris" ? 1 : 0.5,
          }}
        >
          <Dada width={80} height={80} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
