// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyRETnq_IwJqK-k88_YXgLwczF89PWxyw",
  authDomain: "login-auth-915fe.firebaseapp.com",
  projectId: "login-auth-915fe",
  storageBucket: "login-auth-915fe.firebasestorage.app",
  messagingSenderId: "77592828540",
  appId: "1:77592828540:web:7bf103bb51db26e59687f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= getAuth();
export const db= getFirestore(app);
export default app;