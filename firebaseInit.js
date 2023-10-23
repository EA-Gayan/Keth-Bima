import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCb6dTDhbq3PdULw8NVD3IRfaNMYAki_2k",
  authDomain: "keth-bima-941f4.firebaseapp.com",
  projectId: "keth-bima-941f4",
  storageBucket: "keth-bima-941f4.appspot.com",
  messagingSenderId: "768490612208",
  appId: "1:768490612208:web:e19c1f14e91b47119ae935",
  measurementId: "G-5Q5W2JGJC5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(app);
