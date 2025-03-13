import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "../../constants/Colors";
import { getPosts, addPost, addPostsListener, removePostsListener, addLike, removeLike, addComment, getComments } from "../firebase/posts"; // Import getComments
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import PostModal from '../../components/PostModal';
import BlogPost from '../../components/BlogPost'; 
import { getAuth } from "firebase/auth"; // Correct import for auth
import CommentModal from '../../components/CommentModal'; // Import CommentModal component

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ image: "", content: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchPosts = async () => {
    const fetchedPosts = await getPosts();
    setPosts(fetchedPosts);
  };

  const fetchComments = async (postId) => {
    const fetchedComments = await getComments(postId);
    setComments(fetchedComments);
  };

  useEffect(() => {
    fetchPosts();

    const handlePostsChange = async () => {
      await fetchPosts();
    };

    addPostsListener(handlePostsChange);

    return () => {
      removePostsListener(handlePostsChange);
    };
  }, []);

  const handleAddPost = async () => {
    try {
      const auth = getAuth();
      const userId = auth.currentUser.uid; // Get the actual logged-in user ID
      await addPost(newPost, userId);
      setNewPost({ image: "", content: "" });
      setModalVisible(false);
      Alert.alert('Success', 'Post created successfully'); // Display success alert
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      Alert.alert('Error', 'Failed to create post'); // Display error alert
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access image library was denied');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setNewPost({ ...newPost, image: pickerResult.assets[0].uri });
    }
  };

  const takePhoto = async () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.error) {
          console.log('Camera Error: ', response.error);
        } else {
          setNewPost({ ...newPost, image: response.assets[0].uri });
        }
      }
    );
  };

  const handleLike = async (postId) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    await addLike(postId, userId);
    await fetchPosts();
  };

  const handleUnlike = async (postId) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    await removeLike(postId, userId);
    await fetchPosts();
  };

  const handleAddComment = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    await addComment(selectedPostId, userId, comment);
    setComment("");
    setCommentModalVisible(false);
    await fetchPosts();
  };

  const handleComment = (postId) => {
    setSelectedPostId(postId);
    fetchComments(postId);
    setCommentModalVisible(true);
  };

  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <PostModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newPost={newPost}
        setNewPost={setNewPost}
        handleAddPost={handleAddPost}
        pickImage={pickImage}
        takePhoto={takePhoto}
      />
      <CommentModal
        modalVisible={commentModalVisible}
        setModalVisible={setCommentModalVisible}
        comment={comment}
        setComment={setComment}
        handleAddComment={handleAddComment}
        comments={comments}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 35,
          }}
        >
          Blog
        </Text>
      </View>
      <TextInput
        placeholder="Share your cooking moments"
        onFocus={() => setModalVisible(true)}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 20,
          padding: 20,
          marginVertical: 10,
          backgroundColor: "#f9f9f9",
        }}
      />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BlogPost
            post={item}
            setPosts={setPosts}
            onLike={() => handleLike(item.id)}
            onUnlike={() => handleUnlike(item.id)}
            onComment={() => handleComment(item.id)}
          />
        )}
      />
    </View>
  );
}
