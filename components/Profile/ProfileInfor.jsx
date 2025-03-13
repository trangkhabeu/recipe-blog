import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { getUserInfo, updateUserProfilePic } from "../../app/utils/firebaseUserUtils";
import { getAuth } from "firebase/auth"; // Correct import for auth
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for camera icon
import { getPosts } from "../../app/firebase/posts"; // Import getPosts to listen for changes
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions

export default function ProfileInfor() {
  const [userInfo, setUserInfo] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading

  const fetchUserInfo = async () => {
    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid; // Get the actual logged-in user ID
      const data = await getUserInfo(userId);
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchPostsAndUpdateUserInfo = async () => {
      await getPosts();
      await fetchUserInfo();
    };

    fetchPostsAndUpdateUserInfo();
  }, []);

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Cập nhật ảnh UI ngay lập tức
      await handleImageUpdate(result.assets[0].uri);
    }
  };

  const handleImageUpdate = async (imageUri) => {
    setLoading(true); // Start loading
    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid;
      const storage = getStorage();
      const storageRef = ref(storage, `profilePictures/${userId}/${Date.now()}.jpg`);

      const response = await fetch(imageUri);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      await updateUserProfilePic(userId, downloadURL);
      setUserInfo((prev) => ({ ...prev, userProfilePic: downloadURL })); // Update image immediately
      setSelectedImage(downloadURL); // Update selected image

      Alert.alert("Success", "Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      Alert.alert("Error", "Failed to update profile picture. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <TouchableOpacity onPress={handleImagePick} style={{ position: "relative" }}>
        <Image
          source={{
            uri: selectedImage || userInfo.userProfilePic || "https://static-cse.canva.com/blob/1806762/1600w-vkBvE1d_xYA.jpg",
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 99,
            opacity: loading ? 0.5 : 1, // Mờ ảnh khi đang tải lên
          }}
        />
        <Ionicons
          name="camera"
          size={24}
          color="black"
          style={{ position: "absolute", bottom: 0, left: 0 }}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        {userInfo.fullName || "Sarah On The Mic"}
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 16,
        }}
      >
        {userInfo.email || "email@gmail.com"}
      </Text>
    </View>
  );
}
