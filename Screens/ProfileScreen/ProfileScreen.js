import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, ScrollView, ImageBackground } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./ProfileScreenStyles";
import Background from "../../assets/images/app_background.jpg";
import RegistrationImageAddButton from "../../components/RegistrationImageAddButton";
import RegistrationImageRemoveButton from "../../components/RegistrationImageRemoveButton";
import PostComponent from "../../components/PostComponent/PostComponent";
import LogoutButton from "../../components/LogoutButton";
import {
    selectUserPhoto,
    selectUserName,
    selectUserId,
} from "../../redux/authorization/authSelectors";
import { selectAllPosts } from "../../redux/posts/postsSelectors";
import { getPosts } from "../../redux/posts/postsOperations";
import { uploadNewAvatar } from "../../redux/authorization/authOperations";

const ProfileScreen = () => {
    const userId = useSelector(selectUserId);
    const userPosts = useSelector(selectAllPosts).filter(
        item => Object.values(item)[0].userId === userId
    );

    const sortedUserPosts = [...userPosts].sort((a, b) => {
        const dateA = Object.values(a)[0].date;
        const dateB = Object.values(b)[0].date;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

    const userPhoto = useSelector(selectUserPhoto);
    const userName = useSelector(selectUserName);
    const [userAvatar, setUserAavatar] = useState(userPhoto);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [sortedUserPosts]);

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

        if (!result.canceled) {
            setUserAavatar(result.assets[0].uri);
            dispatch(uploadNewAvatar([userId, result.assets[0].uri]));
        }
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

                <Text style={styles.profileHeader}>{userName}</Text>
                <ScrollView
                    style={{ margin: 0, padding: 0 }}
                    showsVerticalScrollIndicator={false}
                >
                    {sortedUserPosts.map(item => {
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
                                id={key}
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
