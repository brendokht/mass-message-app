import React, { useEffect, useRef, useState } from "react";
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Alert,
    Image,
    TouchableWithoutFeedback,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native";
import styles from "../styles";
import NavigationFooterBar from "../components/NavigationFooterBar";
import { logOut } from "../firebase/auth";
import { getUserDetails } from "../firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { uploadProfilePictureToFirebase } from "../firebase/storage";
import { auth } from "../firebase/config";

const Profile = ({ navigation }) => {
    // State variables
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [imageURI, setImageURI] = useState(null);

    // useEffect
    useEffect(() => {
        const fetchData = async () => {
            console.log("Grabbing current user data...");
            const user = await getUserDetails();
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPhoneNumber(user.phoneNumber);
            setImageURI(user.photoURL);
        };
        fetchData();
    }, []);

    // Handler for logging out
    const logoutHandler = () => {
        logOut().then((result) => {
            navigation.navigate("Login");
        });
    };

    // ImagePicker Methods
    const pickImage = async () => {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (result.status === "denied") {
            Alert.alert(
                "Insufficient Permissions",
                "You need to grant photo library permissons to use this feature. Please allow access in your device's settings",
                ["Ok"]
            );
            return;
        }
        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log("Picked image", image);

        if (!image.canceled) {
            uploadProfilePictureToFirebase(image.assets[0].uri)
                .then((response) => {
                    console.log("uploadPFP response", response);
                    setImageURI(response);
                })
                .catch((error) => {
                    Alert.alert("Error", error.message, ["Ok"], {
                        cancelable: true,
                    });
                });
        } else {
            Alert.alert("Error", "Action Cancelled", ["Ok"], {
                cancelable: true,
            });
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ ...styles.screen, justifyContent: "flex-end" }}
        >
            <SafeAreaView
                style={{
                    flex: 1,
                    width: "100%",
                }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                            ...styles.container,
                            flex: 1,
                            justifyContent: "flex-end",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 36,
                                fontWeight: 600,
                                color: "white",
                            }}
                        >
                            Profile
                        </Text>
                        <TouchableOpacity
                            style={styles.pfpContainer}
                            onPress={pickImage}
                        >
                            {imageURI ? (
                                <Image
                                    source={{ uri: imageURI }}
                                    style={{
                                        height: 128,
                                        width: 128,
                                        borderRadius: 64,
                                        resizeMode: "contain",
                                    }}
                                />
                            ) : (
                                <Image
                                    source={require("../icons/profile.png")}
                                    style={{
                                        height: 96,
                                        width: 96,
                                    }}
                                />
                            )}
                            <Image
                                style={{
                                    width: 16,
                                    height: 16,
                                    backgroundColor: "lightgrey",
                                    position: "absolute",
                                    bottom: 10,
                                    right: 10,
                                    borderRadius: 8,
                                }}
                                source={require("../icons/add.png")}
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Firstname"
                            editable={false}
                            value={firstName}
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Lastname"
                            editable={false}
                            value={lastName}
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            editable={false}
                            value={email}
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Phone number"
                            editable={false}
                            value={phoneNumber}
                            keyboardType="phone-pad"
                        />
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={{
                                    ...styles.button,
                                    marginHorizontal: 5,
                                }}
                            >
                                <Text style={{ fontSize: 20 }}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    ...styles.button,
                                    marginHorizontal: 5,
                                }}
                                onPress={logoutHandler}
                            >
                                <Text style={{ fontSize: 20 }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }} />
                        <View style={{ width: "100%" }}>
                            <NavigationFooterBar />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default Profile;
