import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileInfor from "../../components/Profile/ProfileInfor";
import { getPostsByUser } from "../firebase/posts";
import BlogPost from "../../components/BlogPost";
import { getAuth } from "firebase/auth"; // Correct import for auth

const Tab = createMaterialTopTabNavigator();
export default function Profile() {
  const [posts, setPosts] = useState([]);
   const auth = getAuth();
    const userId = auth.currentUser.uid; 

  useEffect(() => {
    const fetchPosts = async () => {
      const userPosts = await getPostsByUser(userId);
      setPosts(userPosts);
    };
    fetchPosts();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      {/* Profile */}
      <ProfileInfor />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BlogPost post={item} />}
      />
    </View>
  );
}
