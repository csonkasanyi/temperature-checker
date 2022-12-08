import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyARrYDuu3v1q_z4rEZIuVp-IcEygtEcwJ8",
    authDomain: "temperature-checker-1680b.firebaseapp.com",
    projectId: "temperature-checker-1680b",
    storageBucket: "temperature-checker-1680b.appspot.com",
    messagingSenderId: "351853446102",  
    appId: "1:351853446102:web:2243bb5a00a6f1c33cda77"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);