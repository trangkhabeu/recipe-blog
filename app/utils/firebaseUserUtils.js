import { ref, set, get, child } from "firebase/database";
import { database } from "../config/firebaseConfig";

export const saveUserInfo = (userId, fullName, email, userProfilePic = "") => {
  return set(ref(database, 'users/' + userId), {
    fullName: fullName,
    email: email,
    userProfilePic: userProfilePic, // Initialize userProfilePic
  });
};

export const getUserInfo = (userId) => {
  const dbRef = ref(database);
  return get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  }).catch((error) => {
    console.error(error);
  });
};
