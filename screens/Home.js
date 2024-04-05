import React, { useEffect, useState } from "react";
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Alert,
    Image,
} from "react-native";
import styles from "../styles";
import Widget from "../components/Widget";
import NavigationFooterBar from "../components/NavigationFooterBar";
import { getUserDetails } from "../firebase/firestore";

const Home = ({ navigation }) => {
    const [firstName, setFirstName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserDetails();
            setFirstName(user.firstName);
        };
        fetchData();
    });
    return (
        <SafeAreaView style={styles.screen}>
            <Text style={{ fontSize: 36, fontWeight: 600, color: "white" }}>
                Hello, {firstName}
            </Text>
            <Image
                source={require("../icons/logo.png")}
                style={{ height: 128, width: 128, marginVertical: 24 }}
            />
            <View style={styles.row}>
                <Widget
                    icon={require("../icons/sms.png")}
                    navigateTo={"Message"}
                    smsOrEmail={"sms"}
                />
                <Widget
                    icon={require("../icons/profile.png")}
                    navigateTo={"Profile"}
                />
            </View>
            <View style={styles.row}>
                <Widget
                    icon={require("../icons/mail.png")}
                    navigateTo={"Message"}
                    smsOrEmail={"email"}
                />
                <Widget
                    icon={require("../icons/notification.png")}
                    navigateTo={"Home"}
                />
            </View>
            <View style={styles.bottomContainer}>
                <NavigationFooterBar />
            </View>
        </SafeAreaView>
    );
};

export default Home;
