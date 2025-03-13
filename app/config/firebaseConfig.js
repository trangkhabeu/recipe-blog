// Import the functions you need from the SDKs you need
// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBrrYK8_rbt-NgHVsQ_lytCUvPodgmMFd8",
    authDomain: "grocery-9f5f0.firebaseapp.com",
    databaseURL: "https://grocery-9f5f0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "grocery-9f5f0",
    storageBucket: "grocery-9f5f0.appspot.com",
    messagingSenderId: "66402216741",
    appId: "1:66402216741:web:c70d64007a6cc7f81ac8cc",
    measurementId: "G-EK5SDD02SH"
  };
// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firebase Auth với AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const database = getDatabase(app);

export { auth, database };