import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";

const NavigationFooterBar = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.footerBar}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Image source={require("../icons/home.png")} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Message")}>
                <Image source={require("../icons/sms.png")} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image source={require("../icons/profile.png")} />
            </TouchableOpacity>
        </View>
    );
};

export default NavigationFooterBar;
