// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ This line is important

const firebaseConfig = {
  apiKey: "AIzaSyD4qiZFHAoLrDSzDIKXb8uv_-hUWRvtIio",
  authDomain: "renotes-f4e39.firebaseapp.com",
  projectId: "renotes-f4e39",
  storageBucket: "renotes-f4e39.firebasestorage.app",
  messagingSenderId: "681324630348",
  appId: "1:681324630348:web:23c3b3ac42ea2b6185ffe9",
  measurementId: "G-VJBFFYDWCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore instance
export { db };
