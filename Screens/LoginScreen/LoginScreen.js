import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./LoginScreenStyles";
import Background from "../../assets/images/app_background.jpg";
import InputComponent from "../../components/InputComponent";
import { selectIsAuthorized } from "../../redux/authorization/authSelectors";
import { login } from "../../redux/authorization/authOperations";

const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const isAutorized = useSelector(selectIsAuthorized);

    const navigateToPostsScreen = () => {
        navigation.navigate("Home", {
            screen: "PostScreen",
        });
    };

    useEffect(() => {
        if (isAutorized) {
            navigateToPostsScreen();
        }
    }, [isAutorized]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmitButtonPress = () => {
        if (!email || !password) {
            alert("Please enter valid credentials!");
            return;
        }
        dispatch(login({ email, password })).then(result => {
            result.type === "authorization/login/fulfilled"
                ? navigateToPostsScreen()
                : alert("Incorect data");
        });
    };

    return (
        <ImageBackground
            source={Background}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginFormHeader}>Увійти</Text>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                    >
                        <View style={styles.loginForm}>
                            <InputComponent
                                placeholder={"Адреса електронної пошти"}
                                type={"email"}
                                name={"email"}
                                value={email}
                                onChangeText={setEmail}
                            />

                            <View style={{ position: "relative" }}>
                                <InputComponent
                                    placeholder={"Пароль"}
                                    type={"password"}
                                    name={"password"}
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity
                                    style={{
                                        position: "absolute",
                                        right: 16,
                                        top: 16,
                                    }}
                                    onPress={togglePasswordVisibility}
                                >
                                    <Text style={{ color: "#1B4371" }}>
                                        {showPassword
                                            ? "Приховати"
                                            : "Показати"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>

                    <TouchableOpacity
                        onPress={handleSubmitButtonPress}
                        style={styles.loginFormSubmitButton}
                        title="Увійти"
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: "center",
                                color: "#ffffff",
                            }}
                        >
                            Увійти
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 3,
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#1B4371",
                                textAlign: "center",
                            }}
                        >
                            Немає акаунту?
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("RegistrationScreen")
                            }
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: "#1B4371",
                                    textAlign: "center",
                                }}
                            >
                                Зареєструватися
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
};

export default LoginScreen;
