import dotenv from "dotenv";
dotenv.config();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBte3-vMxmjejusDcFd09zx6NkKkJb7EuA",
  authDomain: "elice-cfd.firebaseapp.com",
  projectId: "elice-cfd",
  storageBucket: "elice-cfd.appspot.com",
  messagingSenderId: "739068178262",
  appId: "1:739068178262:web:d73ac57750108853df30f7",
  measurementId: "G-D8HD6FJBE0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
