import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors.ts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig"; // Updated import path

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignIn = () => {
    if (!email || !password) {
      alert("Please enter email & password");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.replace("/home");
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, error.code);
        if (errorCode == "auth/invalid-email") {
          alert("Invalid email");
        } else if (errorCode == "auth/wrong-password") {
          alert("Invalid password");
        } else if (errorCode == "auth/user-not-found") {
          alert("User not found. Please check your email.");
        } else if (errorCode == "auth/invalid-credential") {
          alert("Invalid credentials");
        } else {
          alert("Login failed. Please try again.");
        }
      });
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 40,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          marginTop: 30,
        }}
      >
        Sign In
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 30,
          color: Colors.GRAY,
          marginTop: 20,
        }}
      >
        Welcome back!
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 30,
          color: Colors.GRAY,
          marginTop: 10,
        }}
      >
        Nice to see you again
      </Text>

      {/* email */}
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontFamily: "outfit" }}>Email</Text>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          style={styles.input}
          placeholder="Enter Email"
        />
      </View>
      {/* passwords */}
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "outfit" }}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(value) => setPassword(value)}
          placeholder="Enter Password"
        />
      </View>

      {/* sign in button */}
      <TouchableOpacity
        onPress={onSignIn}
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>

      {/* create acc button */}
      <TouchableOpacity
        onPress={() => router.replace("/login/signup")}
        style={{
          padding: 20,
          backgroundColor: Colors.WHITE,
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            textAlign: "center",
          }}
        >
          Create new account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: "outfit",
  },
});

