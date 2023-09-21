import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_j9Psvrk5xReHti7w2tf3jYh9ttabDtw",
  authDomain: "keth-bima.firebaseapp.com",
  projectId: "keth-bima",
  storageBucket: "keth-bima.appspot.com",
  messagingSenderId: "573163270470",
  appId: "1:573163270470:web:72404a4bf50f53dbe6f547"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});export const FIREBASE_FIRESTORE = getFirestore(app)