// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7NkKqpr4tq75nYNfzmQqqfaqGvfssc_w",
  authDomain: "react-cursos-92502.firebaseapp.com",
  projectId: "react-cursos-92502",
  storageBucket: "react-cursos-92502.appspot.com",
  messagingSenderId: "39015481492",
  appId: "1:39015481492:web:c99c877536d644b04ef481"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth=getAuth(FirebaseApp);
export const  FirebaseDB=getFirestore(FirebaseApp);