import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback } from "react-native";
import { Colors } from "../constants/Colors.ts";
import { deletePost, getPosts, updatePost } from "../app/firebase/posts"; // Import deletePost, getPosts, and updatePost functions
import { getAuth } from "firebase/auth"; // Import getAuth
import PostModal from './PostModal'; // Import PostModal

const BlogPost = ({ post, onEdit, setPosts }) => {
  const auth = getAuth();
  const currentUserId = auth.currentUser.uid;
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editPost, setEditPost] = useState(post);

  const handleDelete = async () => {
    try {
      await deletePost(post.id);
      Alert.alert('Success', 'Post deleted successfully'); // Display success alert
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete post'); // Display error alert
    }
  };

  const handleEditPost = async () => {
    try {
      await updatePost(post.id, editPost);
      setEditModalVisible(false);
      Alert.alert('Success', 'Post edited successfully'); // Display success alert
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      Alert.alert('Error', 'Failed to edit post'); // Display error alert
    }
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.userInfo}>
        {post.userProfilePic ? (
          <Image source={{ uri: post.userProfilePic }} style={styles.profilePic} />
        ) : (
          <View style={styles.placeholderProfilePic} />
        )}
        <Text style={styles.userName}>{post.userName}</Text>
        {post.userId === currentUserId && (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.menuTrigger}>...</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.postContent}>{post.content}</Text>
      {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
      
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => { setEditModalVisible(true); setModalVisible(false); }}>
            <Text style={styles.modalOption}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { handleDelete(); setModalVisible(false); }}>
            <Text style={styles.modalOption}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <PostModal
        modalVisible={editModalVisible}
        setModalVisible={setEditModalVisible}
        newPost={editPost}
        setNewPost={setEditPost}
        handleAddPost={handleEditPost}
        pickImage={() => {}}
        takePhoto={() => {}}
      />
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
    flex: 1,
  },
  menuTrigger: {
    fontSize: 20,
    paddingHorizontal: 10,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  modalOption: {
    fontSize: 18,
    paddingVertical: 10,
  },
});

export default BlogPost;
