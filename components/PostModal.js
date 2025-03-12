import React from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Modal, StyleSheet, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const PostModal = ({ modalVisible, setModalVisible, newPost, setNewPost, handleAddPost, pickImage, takePhoto }) => {
  const handlePost = async () => {
    await handleAddPost();
    Alert.alert('Success', 'Post created successfully');
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.backButton}>
              <Icon name="arrow-left" size={30} color="#000" />
            </TouchableOpacity>
            <Button title="Post" onPress={handlePost} style={styles.postButton} />
          </View>
          <TextInput
            placeholder="What's on your mind?"
            value={newPost.content}
            onChangeText={(text) => setNewPost({ ...newPost, content: text })}
            style={styles.textInput}
          />
          {newPost.image ? (
            <Image source={{ uri: newPost.image }} style={styles.image} />
          ) : null}
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={takePhoto} style={styles.iconButton}>
              <Icon name="camera" size={24} color="#000" />
              <Text>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
              <Icon name="upload" size={30} color="#000" />
              <Text>Upload Image/Video</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginTop: 50,
  },
  modalContent: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    alignItems: 'center',
  },
  postButton: {
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  image: {
    height: 200,
    width: "100%",
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconButton: {
    alignItems: "center",
  },
});

export default PostModal;
