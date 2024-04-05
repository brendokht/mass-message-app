import {
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
    setDoc,
} from "firebase/firestore";
import { auth, db } from "./config";

const addUser = async (uid, firstName, lastName) => {
    try {
        const docRef = await setDoc(doc(db, "users", uid), {
            firstName: firstName,
            lastName: lastName,
            createdAt: serverTimestamp(),
            modifiedAt: serverTimestamp(),
        });
        console.log(`User ${uid} added to database`);
    } catch (error) {
        throw error;
    }
};

const updateUser = async (firstName, lastName) => {
    const currentUser = auth.currentUser;
    try {
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, {
            firstName: firstName,
            lastName: lastName,
            modifiedAt: serverTimestamp(),
        });
        console.log(`User ${currentUser.uid} updated`);
    } catch (error) {
        throw error;
    }
};

const addOrUpdateUserContacts = async (contacts) => {
    const currentUser = auth.currentUser;
    try {
        if (!Array.isArray(contacts)) {
            throw new Error("Something went wrong.");
        }
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, {
            contacts: contacts,
            modifiedAt: serverTimestamp(),
        });
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves a user by their UID given by the Firebase Authentication
 * @param {*} uid - The UID of the user
 * @returns The user's data from the Firestore database, or null if user is not found
 */
const getUserByUID = async (uid) => {
    try {
        console.log("Getting user by ID:", uid);
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            console.log(`Retrieved User ${uid}'s details`);
            return userSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves the current user's details
 * @returns user object
 */
const getUserDetails = async () => {
    try {
        let user = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            photoURL: "",
        };
        const currentUser = auth.currentUser;
        console.log("Getting user details");

        user.email = currentUser.email;
        user.phoneNumber = currentUser.phoneNumber;
        user.photoURL = currentUser.photoURL;

        const currentUserDB = await getUserByUID(currentUser.uid);

        if (currentUserDB) {
            user.firstName = currentUserDB.firstName;
            user.lastName = currentUserDB.lastName;
        } else {
            throw new Error(
                "User not found in database... Please contact support"
            );
        }
        return user;
    } catch (error) {
        throw error;
    }
};

const getUserContacts = async () => {
    try {
        const currentUser = auth.currentUser;
        console.log("Getting user contacts");
        const currentUserDb = await getUserByUID(currentUser.uid);

        if (currentUserDb) {
            console.log("User found.. returning contacts");
            if (currentUserDb.contacts) {
                return currentUserDb.contacts;
            } else {
                return [];
            }
        } else
            throw new Error(
                "User not found in database... Please contact support"
            );
    } catch (error) {
        throw error;
    }
};

export {
    addUser,
    updateUser,
    getUserByUID,
    getUserDetails,
    addOrUpdateUserContacts,
    getUserContacts,
};
