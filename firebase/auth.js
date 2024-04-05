import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth, db } from "./config";
import { addUser } from "./firestore";

const registerUser = (firstname, lastname, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            console.log(`User ${result.user.uid} registered successfully`);
            addUser(result.user.uid, firstname, lastname);
        })
        .catch((err) => {
            throw error;
        });
};

const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
            console.log(`User ${result.user.uid} signed in`);
        })
        .catch((error) => {
            throw error;
        });
};

const logOut = () => {
    return signOut(auth)
        .then((result) => {
            console.log(`User logged out`);
        })
        .catch((error) => {
            throw error;
        });
};

export { registerUser, logIn, logOut };
