
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdKXvcqng5ENGW6iWZ7tTDXiZLkIfn7Jg",
  authDomain: "digivisi-72889.firebaseapp.com",
  projectId: "digivisi-72889",
  storageBucket: "digivisi-72889.firebasestorage.app",
  messagingSenderId: "685773727200",
  appId: "1:685773727200:web:a4fdfb164a05ab7c6df785",
  measurementId: "G-ELDN22R71Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
