// Dealing with keyboards are a nightmare..
import React, { useState } from "react";
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
import { logIn, registerUser } from "../firebase/auth";

const Register = ({ navigation }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registrationHandler = () => {
        const user = registerUser(firstName, lastName, email, password)
            .then(() => {
                logIn(email, password).then(() => {
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");
                    navigation.navigate("Home");
                });
            })
            .catch((error) => {
                Alert.alert("Error", error.code, ["Ok"], { cancelable: true });
            });
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ ...styles.screen, justifyContent: "flex-end" }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{
                            ...styles.container,
                            flex: 1,
                            justifyContent: "flex-end",
                            marginBottom: 32,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 36,
                                fontWeight: 600,
                                color: "white",
                            }}
                        >
                            Register
                        </Text>
                        <Image
                            source={require("../icons/logo.png")}
                            style={{
                                height: 128,
                                width: 128,
                                marginVertical: 24,
                            }}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Firstname"
                            value={firstName}
                            onChangeText={(text) => setFirstName(text)}
                            autoCapitalize="words"
                            autoCorrect={false}
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Lastname"
                            value={lastName}
                            onChangeText={(text) => setLastName(text)}
                            autoCapitalize="words"
                            autoCorrect={false}
                            keyboardType="default"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Password"
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="visible-password"
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={registrationHandler}
                        >
                            <Text style={{ fontSize: 20 }}>Register</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                        <View
                            style={{
                                width: "100%",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    textAlign: "center",
                                    fontSize: 18,
                                }}
                            >
                                Already have an account?{" "}
                                <Text
                                    style={{ color: "violet" }}
                                    onPress={() => navigation.navigate("Login")}
                                >
                                    Log in here!
                                </Text>
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default Register;
