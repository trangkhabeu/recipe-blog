import { View, Text } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function OptionCard({ option, selectedOption }) {
  return (
    <View
      style={[
        {
          padding: 25,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: Colors.LIGHT_GRAY,
          borderRadius: 15,
        },
        selectedOption?.id == option?.id && { borderWidth: 3 },
      ]}
    >
      <View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          {option?.title}
        </Text>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "outfit",
              color: Colors.GRAY,
            }}
          >
            {option?.desc}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 35,
          marginLeft: 5,
        }}
      >
        {option.icon}
      </Text>
    </View>
  );
}

