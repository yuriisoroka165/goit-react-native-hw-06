import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { Svg, Path, Rect, G, Defs, ClipPath } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import { posts } from "../../posts";
import { styles } from "./CreatePostsScreenStyles";

const CreatePostsScreen = () => {
    const navigation = useNavigation();
    const [postPhoto, setPostPhoto] = useState(null);
    const [photoName, setPhotoName] = useState("");
    const [photoLocationName, setPhotoLocationName] = useState("");
    const [hasPermission, setHasPermission] = useState(null);
    const [currentGeoLocation, setCurrentGeoLocation] = useState({});
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
            }

            let location = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
            setCurrentGeoLocation(coords);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const makePhoto = async () => {
        if (cameraRef.current) {
            const { uri } = await cameraRef.current.takePictureAsync();
            setPostPhoto(uri);
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handleReturnPress = () => {
        console.log("Logout");
    };

    const clearData = () => {
        setPostPhoto(null);
        setPhotoName("");
        setPhotoLocationName("");
    };

    const uploadPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) setPostPhoto(result.assets[0].uri);
    };

    const handleNavigateToPosts = () => {
        navigation.navigate("PostsScreen");
    };

    const handleSubmit = () => {
        const data = {
            img: postPhoto,
            description: photoName,
            comments: [],
            likes: 0,
            locationName: photoLocationName,
            geoLocation: currentGeoLocation,
        };
        posts.unshift(data);
        clearData();
        handleNavigateToPosts();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <View style={styles.createPostsScreenContainer}>
                    <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                        <View style={styles.postPhotoContainer}>
                            {postPhoto ? (
                                <Image
                                    source={{ uri: postPhoto }}
                                    style={{
                                        width: "100%",
                                        height: 240,
                                        borderRadius: 8,
                                    }}
                                />
                            ) : (
                                <Camera
                                    style={{
                                        borderRadius: 8,
                                        width: "100%",
                                        height: 240,
                                        aspectRatio: 4 / 3,
                                        alignSelf: "center",
                                    }}
                                    type={Camera.Constants.Type.back}
                                    ref={cameraRef}
                                >
                                    <TouchableOpacity
                                        onPress={makePhoto}
                                        style={[
                                            styles.addPhotoButton,
                                            postPhoto
                                                ? {
                                                      backgroundColor:
                                                          "rgba(255, 255, 255, 0.3)",
                                                  }
                                                : {},
                                        ]}
                                    >
                                        <Svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <G clip-path="url(#clip0_36_0)">
                                                <Path
                                                    d="M11.9998 15.2C13.7671 15.2 15.1998 13.7673 15.1998 12C15.1998 10.2327 13.7671 8.79999 11.9998 8.79999C10.2325 8.79999 8.7998 10.2327 8.7998 12C8.7998 13.7673 10.2325 15.2 11.9998 15.2Z"
                                                    fill="#BDBDBD"
                                                />
                                                <Path
                                                    d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z"
                                                    fill="#BDBDBD"
                                                />
                                            </G>
                                            <Defs>
                                                <ClipPath id="clip0_36_0">
                                                    <Rect
                                                        width="24"
                                                        height="24"
                                                        fill="white"
                                                    />
                                                </ClipPath>
                                            </Defs>
                                        </Svg>
                                    </TouchableOpacity>
                                </Camera>
                            )}
                        </View>

                        <TouchableOpacity onPress={uploadPhoto}>
                            <Text
                                style={{
                                    marginBottom: 32,
                                    fontSize: 16,
                                    color: "#BDBDBD",
                                }}
                            >
                                {postPhoto
                                    ? "Редагувати фото"
                                    : "Завантажте фото"}
                            </Text>
                        </TouchableOpacity>

                        <TextInput
                            style={styles.photoMetaInput}
                            placeholder="Назва..."
                            type={"text"}
                            name={"photoName"}
                            value={photoName}
                            onChangeText={setPhotoName}
                        />
                        <View
                            style={{ position: "relative", marginBottom: 32 }}
                        >
                            <TouchableOpacity
                                onPress={handleReturnPress}
                                style={styles.mapButton}
                            >
                                <Svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M20 10.3636C20 16.0909 12 21 12 21C12 21 4 16.0909 4 10.3636C4 6.29681 7.58172 3 12 3C16.4183 3 20 6.29681 20 10.3636V10.3636Z"
                                        stroke="#BDBDBD"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <Path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
                                        stroke="#BDBDBD"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </Svg>
                            </TouchableOpacity>

                            <TextInput
                                style={[
                                    styles.photoMetaInput,
                                    { paddingLeft: 28 },
                                ]}
                                placeholder="Місцевість..."
                                type={"text"}
                                name={"photoLocation"}
                                value={photoLocationName}
                                onChangeText={setPhotoLocationName}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={handleSubmit}
                            style={[
                                styles.publishButton,
                                postPhoto
                                    ? {
                                          backgroundColor: "#FF6C00",
                                      }
                                    : {
                                          color: "#BDBDBD",
                                          backgroundColor: "#F6F6F6",
                                      },
                            ]}
                            title="Опублікувати"
                            disabled={!postPhoto}
                        >
                            <Text
                                style={[
                                    {
                                        fontSize: 16,
                                        textAlign: "center",
                                        color: "#ffffff",
                                    },
                                    postPhoto
                                        ? {
                                              backgroundColor: "#FF6C00",
                                          }
                                        : {
                                              color: "#BDBDBD",
                                              backgroundColor: "#F6F6F6",
                                          },
                                ]}
                            >
                                Опублікувати
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={clearData}
                        style={styles.removePostButton}
                    >
                        <Svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M3 6H5H21"
                                stroke="#BDBDBD"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <Path
                                d="M19.5 6C19.5 5.72386 19.2761 5.5 19 5.5C18.7239 5.5 18.5 5.72386 18.5 6H19.5ZM5.5 6C5.5 5.72386 5.27614 5.5 5 5.5C4.72386 5.5 4.5 5.72386 4.5 6H5.5ZM7.5 6C7.5 6.27614 7.72386 6.5 8 6.5C8.27614 6.5 8.5 6.27614 8.5 6H7.5ZM15.5 6C15.5 6.27614 15.7239 6.5 16 6.5C16.2761 6.5 16.5 6.27614 16.5 6H15.5ZM18.5 6V20H19.5V6H18.5ZM18.5 20C18.5 20.8284 17.8284 21.5 17 21.5V22.5C18.3807 22.5 19.5 21.3807 19.5 20H18.5ZM17 21.5H7V22.5H17V21.5ZM7 21.5C6.17157 21.5 5.5 20.8284 5.5 20H4.5C4.5 21.3807 5.61929 22.5 7 22.5V21.5ZM5.5 20V6H4.5V20H5.5ZM8.5 6V4H7.5V6H8.5ZM8.5 4C8.5 3.17157 9.17157 2.5 10 2.5V1.5C8.61929 1.5 7.5 2.61929 7.5 4H8.5ZM10 2.5H14V1.5H10V2.5ZM14 2.5C14.8284 2.5 15.5 3.17157 15.5 4H16.5C16.5 2.61929 15.3807 1.5 14 1.5V2.5ZM15.5 4V6H16.5V4H15.5Z"
                                fill="#BDBDBD"
                            />
                            <Path
                                d="M10 11V17"
                                stroke="#BDBDBD"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <Path
                                d="M14 11V17"
                                stroke="#BDBDBD"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default CreatePostsScreen;
