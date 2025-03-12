import { database } from "../config/firebaseConfig";
import { ref, push, get, child } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export const getPosts = async () => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, "posts"));
  if (snapshot.exists()) {
    const postsData = snapshot.val();
    const userIds = new Set(Object.values(postsData).map(post => post.userId));
    
    const userPromises = Array.from(userIds).map(async (userId) => {
      const userSnapshot = await get(child(dbRef, `users/${userId}`));
      return { userId, ...userSnapshot.val() };
    });

    const userData = await Promise.all(userPromises);
    const usersMap = userData.reduce((acc, user) => {
      acc[user.userId] = user;
      return acc;
    }, {});

    const posts = Object.keys(postsData).map(key => {
      const post = postsData[key];
      const user = usersMap[post.userId] || { fullName: "Unknown", userProfilePic: "" };
      return {
        id: key,
        ...post,
        userName: user.fullName,
        userProfilePic: user.userProfilePic,
      };
    });

    return posts.reverse();
  } else {
    return [];
  }
};

export const addPost = async (post, userId) => {
  if (!post.image) {
    throw new Error("Post image is required");
  }

  const postsRef = ref(database, "posts");
  
  // Upload image to storage
  const storage = getStorage();
  const response = await fetch(post.image);
  const blob = await response.blob();
  const imageRef = storageRef(storage, `images/${userId}/${Date.now()}.jpg`);
  await uploadBytes(imageRef, blob);
  const imageUrl = await getDownloadURL(imageRef);

  // Save post with image URL and userId
  await push(postsRef, { ...post, image: imageUrl, userId });
};

