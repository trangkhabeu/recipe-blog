import { View, Text, FlatList, Image, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileInfor from "../../components/Profile/ProfileInfor";
import { getPostsByUser } from "../firebase/posts";
import { getFavoriteRecipesByUser, addFavoritesListener, removeFavoritesListener } from "../firebase/favorites"; // Import the new function and listener functions
import BlogPost from "../../components/BlogPost";
import { getAuth } from "firebase/auth"; // Correct import for auth
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import FontAwesome from "@expo/vector-icons/FontAwesome"; // Import FontAwesome

const Tab = createMaterialTopTabNavigator();
export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]); // State for favorite recipes
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    const fetchPosts = async () => {
      const userPosts = await getPostsByUser(userId);
      setPosts(userPosts);
    };
    const fetchFavoriteRecipes = async () => {
      const userFavorites = await getFavoriteRecipesByUser(userId);
      setFavoriteRecipes(userFavorites);
    };
    fetchPosts();
    fetchFavoriteRecipes();

    const handleFavoritesChange = () => {
      fetchFavoriteRecipes(); // Refresh favorite recipes when data changes
    };

    addFavoritesListener(handleFavoritesChange);

    return () => {
      removeFavoritesListener(handleFavoritesChange);
    };
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
      {/* Favorite Recipes */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Favorite Recipes
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={{ color: Colors.PRIMARY }}>See All</Text> {/* Wrap text inside <Text> component */}
        </TouchableOpacity>
      </View>
      <FlatList
        data={favoriteRecipes}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("recipe/[id]", { id: item.id })} // Update navigation path
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100, margin: 5, borderRadius: 10 }}
            />
          </TouchableOpacity>
        )}
      />
      {/* Blog Posts */}
      <Text style={{ fontSize: 18, fontWeight: "bold", margin: 10 }}>
        My blog
      </Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BlogPost post={item} />}
      />
      {/* Modal for viewing all favorite recipes */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ width: "90%", backgroundColor: "white", borderRadius: 10, padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>All Favorite Recipes</Text>
            <FlatList
              data={favoriteRecipes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("recipe/[id]", { id: item.id });
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: "100%", height: 200, marginBottom: 10, borderRadius: 10 }}
                  />
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ alignSelf: "flex-end", marginTop: 10 }}>
              <Text style={{ color: Colors.PRIMARY }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
