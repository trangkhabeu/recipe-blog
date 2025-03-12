import { View, Text } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";

export default function Blog() {
  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 35,
          }}
        >
          Blog
        </Text>
      </View>
    </View>
  );
}
