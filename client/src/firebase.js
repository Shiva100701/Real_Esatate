// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shiva-estate.firebaseapp.com",
  projectId: "shiva-estate",
  storageBucket: "shiva-estate.appspot.com",
  messagingSenderId: "271629405449",
  appId: "1:271629405449:web:102f02b2b4bb16a7bad7d8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);