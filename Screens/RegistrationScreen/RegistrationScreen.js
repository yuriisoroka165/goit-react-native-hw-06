import React, { useState } from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { styles } from "./RegistrationScreenStyles";
import Background from "../../assets/images/app_background.jpg";
import RegistrationImageAddButton from "../../components/RegistrationImageAddButton";
import RegistrationImageRemoveButton from "../../components/RegistrationImageRemoveButton";
import InputComponent from "../../components/InputComponent";
import { useNavigation } from "@react-navigation/native";

const RegistrationScreen = () => {
    const navigation = useNavigation();
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [userAvatar, setUserAavatar] = useState(null);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRemoveImage = () => {
        setUserAavatar(null);
    };

    const handleSubmitButtonPress = () => {
        navigation.navigate("MapScreen");
    };

    const uploadAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) setUserAavatar(result.assets[0].uri);
    };

    return (
        <ImageBackground
            source={Background}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.registrationContainer}>
                    <View style={styles.userImageContainer}>
                        {userAvatar && (
                            <Image
                                source={{ uri: userAvatar }}
                                style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 16,
                                }}
                            />
                        )}
                        {!userAvatar ? (
                            <RegistrationImageAddButton
                                onPress={uploadAvatar}
                            ></RegistrationImageAddButton>
                        ) : (
                            <RegistrationImageRemoveButton
                                onPress={handleRemoveImage}
                            ></RegistrationImageRemoveButton>
                        )}
                    </View>

                    <Text style={styles.registrationFormHeader}>
                        Реєстрація
                    </Text>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                    >
                        <View style={styles.registrationForm}>
                            <InputComponent
                                placeholder={"Логін"}
                                type={"text"}
                                name={"login"}
                                value={login}
                                onChangeText={setLogin}
                            />
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
                        style={styles.registrationFormSubmitButton}
                        title="Зареєструватися"
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: "center",
                                color: "#ffffff",
                            }}
                        >
                            Зареєструватися
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
                            Вже є акаунт?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("LoginScreen")}
                        >
                            <Text
                                style={{
                                    gap: 3,
                                    fontSize: 16,
                                    color: "#1B4371",
                                }}
                            >
                                Увійти
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );
};

export default RegistrationScreen;
