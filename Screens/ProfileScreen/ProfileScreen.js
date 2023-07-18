import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, ScrollView, ImageBackground } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";

import { styles } from "./ProfileScreenStyles";
import Background from "../../assets/images/app_background.jpg";
import RegistrationImageAddButton from "../../components/RegistrationImageAddButton";
import RegistrationImageRemoveButton from "../../components/RegistrationImageRemoveButton";
import PostComponent from "../../components/PostComponent/PostComponent";
import LogoutButton from "../../components/LogoutButton";
// import { posts } from "../../posts";
import {
    selectUserPhoto,
    selectUserName,
} from "../../redux/authorization/authSelectors";
import { selectCurrentUserPosts } from "../../redux/posts/postsSelectors";

const ProfileScreen = () => {
    const posts = useSelector(selectCurrentUserPosts);
    const userPhoto = useSelector(selectUserPhoto);
    const userName = useSelector(selectUserName);
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
                    {userPhoto && (
                        <Image
                            source={{ uri: userPhoto }}
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 16,
                            }}
                        />
                    )}
                    {!userPhoto ? (
                        <RegistrationImageAddButton
                            onPress={uploadAvatar}
                        ></RegistrationImageAddButton>
                    ) : (
                        <RegistrationImageRemoveButton
                            onPress={handleRemoveImage}
                        ></RegistrationImageRemoveButton>
                    )}
                </View>

                <Text style={styles.profileHeader}>{userName}</Text>
                <ScrollView
                    style={{ margin: 0, padding: 0 }}
                    showsVerticalScrollIndicator={false}
                >
                    {posts.map(item => {
                        const key = Object.keys(item)[0];
                        const {
                            img,
                            description,
                            likes,
                            comments,
                            locationName,
                            geoLocation,
                        } = item[key];
                        return (
                            <PostComponent
                                key={key}
                                image={img}
                                description={description}
                                likes={likes}
                                comments={comments ? comments : []}
                                locationName={locationName}
                                geoLocation={geoLocation}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default ProfileScreen;
