// Import the functions you need from the SDKs you need
import "@firebase/auth";
import "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    // Should be using environment variables, won't for now
    apiKey: "AIzaSyA3I22kFbiHc2Ntg1EwkFCLD21xPg0HFGo",
    authDomain: "mass-message-app.firebaseapp.com",
    projectId: "mass-message-app",
    storageBucket: "mass-message-app.appspot.com",
    messagingSenderId: "524876798587",
    appId: "1:524876798587:web:b2b6f04e25b974426f20de",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, db, storage };
