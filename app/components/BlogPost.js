import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors.ts";

const BlogPost = ({ post }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.userInfo}>
        {post.userProfilePic ? (
          <Image source={{ uri: post.userProfilePic }} style={styles.profilePic} />
        ) : (
          <View style={styles.placeholderProfilePic} />
        )}
        <Text style={styles.userName}>{post.userName}</Text>
      </View>
      <Text style={styles.postContent}>{post.content}</Text>
      {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  placeholderProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: Colors.GRAY,
  },
  userName: {
    fontFamily: "outfit-bold",
    fontSize: 16,
  },
  postContent: {
    fontFamily: "outfit",
    fontSize: 14,
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});

export default BlogPost;
