import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Tabs, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "./../../constants/Colors";

export default function TabLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
          headerShown: true,
          headerTitle: " Welcome Back",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.replace("/profile")}
              style={{ marginRight: 15 }}
            >
              <Image
                source={{
                  uri: "https://static-cse.canva.com/blob/1806762/1600w-vkBvE1d_xYA.jpg",
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  marginLeft: 15,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="blog"
        options={{
          tabBarLabel: "Blog",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="tooltip-edit"
              size={24}
              color={color}
            />
          ),
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.replace("/profile")}
              style={{ marginRight: 15 }}
            >
              <Image
                source={{
                  uri: "https://static-cse.canva.com/blob/1806762/1600w-vkBvE1d_xYA.jpg",
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  marginLeft: 15,
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginRight: 20,
                backgroundColor: "#171717",
                padding: 10,
                borderRadius: 30,
              }}
            >
              <MaterialCommunityIcons
                name="bell"
                size={24}
                color={Colors.WHITE}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: "Recipes",
          tabBarIcon: ({ color }) => (
            <Ionicons name="book" size={24} color={color} />
          ),
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.replace("/profile")}
              style={{ marginLeft: 10 }}
            >
              <Image
                source={{
                  uri: "https://static-cse.canva.com/blob/1806762/1600w-vkBvE1d_xYA.jpg",
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  marginLeft: 15,
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginRight: 20,
                backgroundColor: "#171717",
                padding: 10,
                borderRadius: 30,
              }}
            >
              <Ionicons name="search" size={24} color={Colors.WHITE} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-circle" size={24} color={color} />
          ),
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back}
              style={{
                marginRight: 20,
                backgroundColor: Colors.WHITE,
                padding: 10,
                borderRadius: 30,
              }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.replace("auth/sign-in")}
              style={{
                marginRight: 20,
                backgroundColor: Colors.WHITE,
                padding: 10,
                borderRadius: 30,
              }}
            >
              <Ionicons name="exit-outline" size={24} color={Colors.PRIMARY} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
