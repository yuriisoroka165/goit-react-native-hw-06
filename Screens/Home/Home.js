import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Svg, Path, Rect } from "react-native-svg";

import CreatePostsScreen from "../CreatePostsScreen";
import PostsScreen from "../PostsScreen";
import ProfileScreen from "../ProfileScreen";
import LogoutButton from "../../components/LogoutButton";
import ReturnButton from "../../components/ReturnButton";
import { styles } from "./HomeStyles";

const AppTabs = createBottomTabNavigator();

const Home = () => {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <AppTabs.Navigator screenOptions={styles.homeContainer}>
            <AppTabs.Screen
                name="PostsScreen"
                component={PostsScreen}
                options={{
                    headerTitle: () => (
                        <Text style={styles.homePageHeader}>Публікації</Text>
                    ),
                    headerRight: () => (
                        <View style={{ marginRight: 16 }}>
                            <LogoutButton
                                onPress={() =>
                                    navigation.navigate("LoginScreen")
                                }
                            />
                        </View>
                    ),
                    tabBarIcon: () => (
                        <Svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Rect width="24" height="24" fill="white" />
                            <Path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M3 3H10V10H3V3Z"
                                stroke="#212121"
                                stroke-opacity="0.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <Path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14 3H21V10H14V3Z"
                                stroke="#212121"
                                stroke-opacity="0.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <Path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14 14H21V21H14V14Z"
                                stroke="#212121"
                                stroke-opacity="0.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <Path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M3 14H10V21H3V14Z"
                                stroke="#212121"
                                stroke-opacity="0.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </Svg>
                    ),
                }}
            />
            <AppTabs.Screen
                name="CreatePostsScreen"
                component={CreatePostsScreen}
                initialParams={{ user: route.params.params.user }}
                options={{
                    tabBarStyle: { display: "none" },
                    headerTitle: () => (
                        <Text style={styles.homePageHeader}>
                            Створити публікацію
                        </Text>
                    ),
                    headerLeft: () => (
                        <View style={{ marginLeft: 16 }}>
                            <ReturnButton
                                onPress={() =>
                                    navigation.navigate("Home", {
                                        screen: "PostsScreen",
                                        params: {
                                            user: "123",
                                        },
                                    })
                                }
                            />
                        </View>
                    ),
                    tabBarIcon: () => (
                        <View style={styles.addButton}>
                            <Svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <Path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M7.5 0.5H6.5V6.5H0.5V7.5H6.5V13.5H7.5V7.5H13.5V6.5H7.5V0.5Z"
                                    fill="white"
                                />
                            </Svg>
                        </View>
                    ),
                }}
            />
            <AppTabs.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <Svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                                stroke="#212121"
                                stroke-opacity="0.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <Path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                                stroke="#212121"
                                stroke-opacity="0.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </Svg>
                    ),
                }}
            />
        </AppTabs.Navigator>
    );
};

export default Home;
