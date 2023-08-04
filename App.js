import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen/PostsScreen";
import CommentsScreen from "./Screens/CommentsScreen";
import MapScreen from "./Screens/MapScreen/MapScreen";
import Home from "./Screens/Home/Home";
import store from "./redux/store";

const MainStack = createStackNavigator();

const App = () => {
    const [fontsLoaded] = useFonts({
        "Inter-Medium": require("./assets/fonts/Inter/static/Inter-Medium.ttf"),
        "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
        "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
        "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <View style={styles.container}>
                <NavigationContainer>
                    <MainStack.Navigator initialRouteName="LoginScreen">
                        <MainStack.Screen
                            options={{ headerShown: false }}
                            name="Home"
                            component={Home}
                        />
                        <MainStack.Screen
                            options={{ headerShown: false }}
                            name="RegistrationScreen"
                            component={RegistrationScreen}
                        />
                        <MainStack.Screen
                            options={{ headerShown: false }}
                            name="LoginScreen"
                            component={LoginScreen}
                        />
                        <MainStack.Screen
                            options={{ headerShown: false }}
                            name="PostsScreen"
                            component={PostsScreen}
                        />
                        <MainStack.Screen
                            options={{ headerShown: false }}
                            name="CommentsScreen"
                            component={CommentsScreen}
                        />
                        <MainStack.Screen
                            name="MapScreen"
                            component={MapScreen}
                        />
                    </MainStack.Navigator>
                </NavigationContainer>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        backgroundColor: "#fff",
    },
});

export default App;
