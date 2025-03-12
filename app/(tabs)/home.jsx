import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import className from "twrnc";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    // Fetch categories
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, []);

  useEffect(() => {
    // Fetch recipes based on selected category or search query
    if (searchQuery) {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      )
        .then((response) => response.json())
        .then((data) => setRecipes(data.meals));
    } else if (selectedCategory) {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      )
        .then((response) => response.json())
        .then((data) => setRecipes(data.meals));
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef`)
        .then((response) => response.json())
        .then((data) => setRecipes(data.meals));
    }
  }, [selectedCategory, searchQuery]);

  const renderHeader = () => (
    <View style={className`bg-white`}>
      {/* Text */}
      <View style={className`p-5 pt-0`}>
        <Text style={[className`text-3xl `, { fontFamily: "outfit-bold" }]}>
          Make your own food, stay at
          <Text style={className`text-orange-500`}> home</Text>
        </Text>
      </View>
      {/* Text */}

      {/* Search input */}
      <View
        style={className`bg-gray-200 p-2 rounded-full mx-5 flex-row justify-start items-center gap-2`}
      >
        <TextInput
          placeholder="Search any recipe"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={[
            className`flex-1 text-lg  text-gray-500 p-3 rounded-l-full`,
            { fontFamily: "outfit-bold" },
          ]}
        />
        <FontAwesome
          name="search"
          size={24}
          color="black"
          style={className`m-2`}
        />
      </View>
      {/* Search input */}

      {/* Categories */}
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={className`gap-5 p-5`}
          data={categories}
          keyExtractor={(item) => item.idCategory}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item.strCategory)}
            >
              <View>
                <Image
                  source={{ uri: item.strCategoryThumb }}
                  style={className`h-15 w-15 bg-gray-300 rounded-full`}
                />
                <Text
                  style={[
                    className`text-gray-500 mt-1 text-center`,
                    { fontFamily: "outfit" },
                  ]}
                >
                  {item.strCategory.length > 10
                    ? item.strCategory.substring(0, 8) + "..."
                    : item.strCategory}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* Categories */}
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={recipes}
      keyExtractor={(item) => item.idMeal}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={className`flex-1 p-4`}>
          <TouchableOpacity
            // onPress={() => navigation.navigate("DetailRecipe", { item })}
            onPress={() =>
              router.push({
                pathname: "/recipe/detail",
                params: { id: item.idMeal },
              })
            }
          >
            <Image
              source={{ uri: item.strMealThumb }}
              style={className`h-46 w-42 rounded-3xl `}
            />
            <Text
              style={[
                className`text-gray-500 mt-1 text-center`,
                { fontFamily: "outfit-bold" },
              ]}
            >
              {item.strMeal.length > 20
                ? item.strMeal.substring(0, 20) + "..."
                : item.strMeal}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default Home;

