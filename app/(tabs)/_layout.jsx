import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import { Tabs, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "./../../constants/Colors";
import { getAuth, signOut } from "firebase/auth"; // Correct import for auth and signOut
import { getUserInfo } from "../utils/firebaseUserUtils"; // Correct import path

export default function TabLayout() {
  const router = useRouter();
  const [userAvatar, setUserAvatar] = React.useState("");

  React.useEffect(() => {
    // Fetch user info and set avatar
    const fetchUserInfo = async () => {
      const auth = getAuth();
      const userId = auth.currentUser.uid;
      const userInfo = await getUserInfo(userId);
      if (userInfo && userInfo.userProfilePic) {
        setUserAvatar(userInfo.userProfilePic);
      }
    };
    fetchUserInfo();

    const handleUserInfoChange = async () => {
      await fetchUserInfo();
    };

    const intervalId = setInterval(handleUserInfoChange, 5000); // Polling every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      router.replace("/login/signin"); // Navigate to sign-in page after successful sign-out
      Alert.alert('Sign out successful!');
    } catch (error) {
      Alert.alert('Sign out error', error.message);
    }
  };

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
                  uri: userAvatar || "https://static-cse.canva.com/blob/1806762/1600w-vkBvE1d_xYA.jpg",
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
                  uri: userAvatar || "https://static-cse.canva.com/blob/1806762/1600w-vkBvE1d_xYA.jpg",
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
                  uri: userAvatar || "https://static-cse.canva.com/blob/1806762/1600w-vkBvE1d_xYA.jpg",
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
              onPress={() => router.back()}
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
              onPress={handleSignOut}
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
