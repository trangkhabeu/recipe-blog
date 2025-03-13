import React from 'react';
import { Modal, View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon

const CommentModal = ({ modalVisible, setModalVisible, comment, setComment, handleAddComment, comments }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.modalContainer}
            >
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.backIcon}>
                <Icon name="arrow-left" size={20} color="#687076" />
              </TouchableOpacity>
              <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.commentContainer}>
                    <Image source={{ uri: item.userProfilePic || "https://static-cse.canva.com/blob/1806762/1600w-vkBvE1d_xYA.jpg" }} style={styles.avatar} />
                    <View style={styles.commentTextContainer}>
                      <Text style={styles.commentUser}>{item.userName}</Text>
                      <Text style={styles.commentText}>{item.comment}</Text>
                    </View>
                  </View>
                )}
              />
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Add a comment..."
                  value={comment}
                  onChangeText={setComment}
                  style={styles.textInput}
                />
                <TouchableOpacity onPress={handleAddComment}>
                  <Icon name="send" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    height: '50%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  backIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    marginBottom: 10,
  
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentTextContainer: {
    flex: 1,
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentText: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  textInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginRight: 10,
  },
});

export default CommentModal;
