import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors.ts";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./../../../configs/FireBaseConfig";

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

  // const onSignIn = () => {
  //   if (!email || !password) {
  //     ToastAndroid.show("Please enter email & password", ToastAndroid.LONG);
  //     return;
  //   }

  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       router.replace("/mytrip");
  //       console.log(user);
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorMessage, error.code);
  //       if (errorCode == "auth/invalid-email") {
  //         ToastAndroid.show("Email không hợp lệ", ToastAndroid.LONG);
  //       } else if (errorCode == "auth/wrong-password") {
  //         ToastAndroid.show("Mật khẩu không hợp lệ", ToastAndroid.LONG);
  //       } else if (errorCode == "auth/user-not-found") {
  //         ToastAndroid.show(
  //           "Không tìm thấy người dùng. Vui lòng kiểm tra email của bạn.",
  //           ToastAndroid.LONG
  //         );
  //       } else if (errorCode == "auth/invalid-credential") {
  //         ToastAndroid.show(
  //           "Thông tin đăng nhập không hợp lệ",
  //           ToastAndroid.LONG
  //         );
  //       }
  //     });
  // };
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
        onPress={() => router.replace("/home")}
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
        onPress={() => router.replace("/login/singup")}
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

