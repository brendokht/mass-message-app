import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "../styles";
import { useNavigation } from "@react-navigation/native";

const Widget = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.widget}
            onPress={() => {
                navigation.navigate(props.navigateTo, {
                    type: props.smsOrEmail ?? "",
                });
            }}
        >
            <View style={styles.middle}>
                <Image source={props.icon} />
            </View>
        </TouchableOpacity>
    );
};

export default Widget;
