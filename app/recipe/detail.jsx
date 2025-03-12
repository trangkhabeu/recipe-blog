import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import className from "twrnc";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const DetailRecipe = () => {
  const { id } = useLocalSearchParams(); // Lấy id từ params
  const [recipe, setRecipe] = useState(null);
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (id) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setRecipe(data.meals[0]));
    }
  }, [id]);
  if (!recipe) return <Text>Loadng</Text>;
  return (
    <ScrollView
      style={{ backgroundColor: "white", flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View style={className`flex-row justify-center`}>
        <Image
          source={{ uri: recipe.strMealThumb }}
          style={{
            height: 400,
            width: "100%",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        />
      </View>
      <View
        style={className`w-full absolute flex-row justify-between items-center pt-3 px-3`}
      >
        <TouchableOpacity
          style={className`p-3 rounded-full bg-gray-200`}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          style={className`p-3 rounded-full bg-gray-200`}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <FontAwesome
            name="heart"
            size={24}
            color={isFavorite ? "#fbbf24" : "gray"}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 24,
          marginTop: 10,
          fontFamily: "outfit-bold",
        }}
      >
        {recipe.strMeal}
      </Text>
      <Text style={{ marginTop: 10, fontFamily: "outfit" }}>
        {recipe.strInstructions}
      </Text>
      {/* 
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
        {recipe.strMeal}
      </Text>
      <Text style={{ marginTop: 10 }}>{recipe.strInstructions}</Text> */}
    </ScrollView>
  );
};

export default DetailRecipe;

