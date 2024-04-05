import { auth, storage } from "./config";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const uploadProfilePictureToFirebase = async (uri) => {
    try {
        const currentUser = auth.currentUser;
        const fetchResponse = await fetch(uri);
        const blob = await fetchResponse.blob();

        const imageRef = ref(storage, `images/${currentUser.uid}.jpg`);

        const uploadTask = uploadBytesResumable(imageRef, blob);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                () => {},
                (error) => {
                    reject(error);
                },
                () => {
                    let downloadURL;
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((url) => {
                            downloadURL = url;
                            updateProfile(auth.currentUser, {
                                photoURL: url,
                            });
                        })
                        .then(() => {
                            console.log(
                                `User ${currentUser.uid}'s profile picture updated.`
                            );
                            resolve(downloadURL);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }
            );
        });
    } catch (error) {
        throw error;
    }
};

export { uploadProfilePictureToFirebase };
