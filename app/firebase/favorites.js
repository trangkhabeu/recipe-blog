import { database } from "../config/firebaseConfig";
import { ref, set, get, child, remove } from "firebase/database";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

// Function to check if a recipe is already favorited
export const isRecipeFavorited = async (recipeId, userId) => {
  const recipeRef = ref(database, `favorites/${userId}/${recipeId}`);
  const snapshot = await get(recipeRef);
  return snapshot.exists();
};

let favoritesListeners = [];

// Function to notify listeners
const notifyFavoritesListeners = () => {
  favoritesListeners.forEach(listener => listener());
};

// Function to add a listener for favorites changes
export const addFavoritesListener = (listener) => {
  favoritesListeners.push(listener);
};

// Function to remove a listener for favorites changes
export const removeFavoritesListener = (listener) => {
  favoritesListeners = favoritesListeners.filter(l => l !== listener);
};

// Function to save a recipe to Firebase
export const saveRecipeToFavorites = (recipe, userId) => {
  if (recipe) {
    const recipeRef = ref(database, `favorites/${userId}/${recipe.idMeal}`);
    return set(recipeRef, {
      id: recipe.idMeal,
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      instructions: recipe.strInstructions,
    })
    .then(() => {
      console.log("Recipe saved to favorites!");
      notifyFavoritesListeners(); // Notify listeners on success
      return true; // Return true on success
    })
    .catch((error) => {
      console.error("Error saving recipe: ", error);
      return false; // Return false on error
    });
  }
  return false; // Return false if no recipe is provided
};

// Function to remove a recipe from Firebase favorites
export const removeRecipeFromFavorites = (recipeId, userId) => {
  const recipeRef = ref(database, `favorites/${userId}/${recipeId}`);
  return remove(recipeRef)
    .then(() => {
      console.log("Recipe removed from favorites!");
      notifyFavoritesListeners(); // Notify listeners on success
      return true; // Return true on success
    })
    .catch((error) => {
      console.error("Error removing recipe: ", error);
      return false; // Return false on error
    });
};

// Function to get favorite recipes by user
export const getFavoriteRecipesByUser = async (userId) => {
  const dbRef = ref(database, `favorites/${userId}`);
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    const favoritesData = snapshot.val();
    return Object.keys(favoritesData).map(key => ({
      id: key,
      ...favoritesData[key],
    }));
  } else {
    return [];
  }
};