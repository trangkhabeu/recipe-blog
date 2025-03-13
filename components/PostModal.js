import React from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Modal, StyleSheet, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const PostModal = ({ modalVisible, setModalVisible, newPost, setNewPost, handleAddPost, pickImage, takePhoto }) => {
  const handlePost = async () => {
    await handleAddPost();
    Alert.alert('Success', 'Post created successfully');
  };

  const handleCancelImage = () => {
    setNewPost({ ...newPost, image: null });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.backButton}>
              <Icon name="arrow-back" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePost} style={styles.postButton}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="What's on your mind?"
            value={newPost.content}
            onChangeText={(text) => setNewPost({ ...newPost, content: text })}
            style={styles.textInput}
          />
          {newPost.image ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: newPost.image }} style={styles.image} />
              <TouchableOpacity onPress={handleCancelImage} style={styles.cancelButton}>
                <Icon name="cancel" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={takePhoto} style={styles.iconButton}>
              <Icon name="camera-alt" size={24} color="#687076" />
              <Text style={styles.iconText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
              <Icon name="file-upload" size={24} color="#687076" />
              <Text style={styles.iconText}>Upload Image/Video</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '60%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-between',
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
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  textInput: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  image: {
    height: 200,
    width: "100%",
    marginBottom: 10,
    alignSelf: 'center',
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
   
  },
  iconButton: {
    alignItems: "center",
    padding: 10,
  },
  iconText: {
    color: '#687076',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  cancelButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 15,
    padding: 5,
  },
});

export default PostModal;
