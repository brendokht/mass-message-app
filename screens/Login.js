// Dealing with keyboards are a nightmare..
import React, { useEffect, useState } from "react";
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
import { logIn } from "../firebase/auth";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = () => {
        logIn(email, password)
            .then(() => {
                setEmail("");
                setPassword("");
                navigation.navigate("Home");
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
                            Log in
                        </Text>
                        <Image
                            source={require("../icons/logo.png")}
                            style={{
                                height: 128,
                                width: 128,
                                marginVertical: 24,
                            }}
                        />
                        <View style={{ flex: 0.5 }} />
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
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={loginHandler}
                        >
                            <Text style={{ fontSize: 20 }}>Log in</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 0.5 }} />
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
                                Don't have an account?{" "}
                                <Text
                                    style={{ color: "violet" }}
                                    onPress={() =>
                                        navigation.navigate("Register")
                                    }
                                >
                                    Register in here!
                                </Text>
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default Login;
