import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, ScrollView, ImageBackground } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { styles } from "./ProfileScreenStyles";
import Background from "../../assets/images/app_background.jpg";
import RegistrationImageAddButton from "../../components/RegistrationImageAddButton";
import RegistrationImageRemoveButton from "../../components/RegistrationImageRemoveButton";
import PostComponent from "../../components/PostComponent/PostComponent";
import LogoutButton from "../../components/LogoutButton";
import { posts } from "../../posts";

const ProfileScreen = () => {
    const [login, setLogin] = useState("Natali Romanova");
    const [userAvatar, setUserAavatar] = useState(userAvatar);
    const navigation = useNavigation();

    const handleRemoveImage = () => {
        setUserAavatar(null);
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
            <View style={styles.profileContainer}>
                <View style={styles.profileLogoutButton}>
                    <LogoutButton
                        onPress={() => navigation.navigate("LoginScreen")}
                    />
                </View>

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

                <Text style={styles.profileHeader}>{login}</Text>
                <ScrollView
                    style={{ margin: 0, padding: 0 }}
                    showsVerticalScrollIndicator={false}
                >
                    {posts.map(
                        ({
                            img,
                            description,
                            likes,
                            comments,
                            locationName,
                            geoLocation,
                        }) => {
                            return (
                                <PostComponent
                                    key={description}
                                    image={img}
                                    description={description}
                                    likes={likes}
                                    comments={comments}
                                    locationName={locationName}
                                    geoLocation={geoLocation}
                                />
                            );
                        }
                    )}
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default ProfileScreen;
