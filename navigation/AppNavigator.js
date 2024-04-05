import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home.js";
import Login from "../screens/Login.js";
import Register from "../screens/Register.js";
import Profile from "../screens/Profile.js";
import Message from "../screens/Message.js";

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={() => ({ headerShown: false })}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={() => ({ headerShown: false })}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={() => ({ headerShown: false })}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={() => ({ headerShown: false })}
                />
                <Stack.Screen
                    name="Message"
                    component={Message}
                    options={() => ({ headerShown: false })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
