import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import className from "twrnc";
import { useRouter } from "expo-router";
const index = () => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push("/login/signin")}
      style={className`bg-orange-500 flex-1 items-center justify-center`}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={className`w-70 h-70`}
      />
      <Text style={className`text-6xl font-bold text-white`}>Foody</Text>
      <Text style={className`text-lg text-white font-semibold`}>
        Food is always right
      </Text>
      <Text style={className`text-lg text-white mt-25 italic`}>
        Press to continue
      </Text>
    </Pressable>
  );
};

export default index;

