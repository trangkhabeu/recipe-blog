import { database } from "../config/firebaseConfig";
import { ref, push, get, child, remove, update } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

let listeners = [];

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

export const getPostsByUser = async (userId) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, "posts"));
  if (snapshot.exists()) {
    const postsData = snapshot.val();
    const userSnapshot = await get(child(dbRef, `users/${userId}`));
    const user = userSnapshot.exists() ? userSnapshot.val() : { fullName: "Unknown", userProfilePic: "" };

    const posts = Object.keys(postsData)
      .filter(key => postsData[key].userId === userId)
      .map(key => {
        const post = postsData[key];
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

  // Notify listeners
  notifyListeners();

  // Refresh posts data
  await getPosts();
  await getPostsByUser(userId);
};

export const deletePost = async (postId) => {
  const dbRef = ref(database, `posts/${postId}`);
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    const post = snapshot.val();
    if (post.image) {
      const storage = getStorage();
      const imageRef = storageRef(storage, post.image);
      await deleteObject(imageRef);
    }
    await remove(dbRef);

    // Notify listeners
    notifyListeners();

    // Refresh posts data
    await getPosts();
    await getPostsByUser(post.userId);
  }
};

export const updatePost = async (postId, updatedPost) => {
  const dbRef = ref(database, `posts/${postId}`);
  const snapshot = await get(dbRef);
  if (snapshot.exists()) {
    const post = snapshot.val();
    let imageUrl = post.image;

    if (updatedPost.image && updatedPost.image !== post.image) {
      // Upload new image to storage
      const storage = getStorage();
      const response = await fetch(updatedPost.image);
      const blob = await response.blob();
      const imageRef = storageRef(storage, `images/${post.userId}/${Date.now()}.jpg`);
      await uploadBytes(imageRef, blob);
      imageUrl = await getDownloadURL(imageRef);

      // Delete old image from storage
      const oldImageRef = storageRef(storage, post.image);
      await deleteObject(oldImageRef);
    }

    // Update post with new data
    await update(dbRef, { ...updatedPost, image: imageUrl });

    // Notify listeners
    notifyListeners();

    // Refresh posts data
    await getPosts();
    await getPostsByUser(post.userId);
  } else {
    throw new Error("Post not found");
  }
};

const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

export const addPostsListener = (listener) => {
  listeners.push(listener);
};

export const removePostsListener = (listener) => {
  listeners = listeners.filter(l => l !== listener);
};

