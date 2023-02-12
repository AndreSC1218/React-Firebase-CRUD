// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//firestore
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPWC3HmZOIHyv1Wob9beQoH4sACGuMhNo",
  authDomain: "react-firebase-crud-15668.firebaseapp.com",
  projectId: "react-firebase-crud-15668",
  storageBucket: "react-firebase-crud-15668.appspot.com",
  messagingSenderId: "450942857460",
  appId: "1:450942857460:web:a94a88fc5a8cf3b74eeea1",
  measurementId: "G-KGH247RP9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);