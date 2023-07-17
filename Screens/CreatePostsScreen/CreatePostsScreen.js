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
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";

import { posts } from "../../posts";
import { styles } from "./CreatePostsScreenStyles";
import {
    CameraIcon,
    MapIcon,
    TrashIcon,
} from "../../components/SvgIcons/SvgIcons";
import { addPost } from "../../redux/posts/postsOperations";
import { selectUserId } from "../../redux/authorization/authSelectors";
import { uploadPhotoToStore } from "../../redux/storage/storageOperations";
import { selectAllPosts } from "../../redux/posts/postsSelectors";

const CreatePostsScreen = () => {
    const navigation = useNavigation();
    const [postPhoto, setPostPhoto] = useState(null);
    const [photoName, setPhotoName] = useState("");
    const [photoLocationName, setPhotoLocationName] = useState("");
    const [hasPermission, setHasPermission] = useState(null);
    const [currentGeoLocation, setCurrentGeoLocation] = useState({});
    const cameraRef = useRef(null);
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const allPosts = useSelector(selectAllPosts);

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

    const handleSubmit = async () => {
        if (!postPhoto || !photoName || !photoLocationName) {
            alert("Please add data for all fields!");
            return;
        }
        const { payload } = await dispatch(uploadPhotoToStore(postPhoto));
        dispatch(
            addPost({
                img: payload,
                description: photoName,
                locationName: photoLocationName,
                geoLocation: currentGeoLocation,
                userId,
            })
        );
        // console.log({
        //     img: payload,
        //     description: photoName,
        //     locationName: photoLocationName,
        //     geoLocation: currentGeoLocation,
        //     useId,
        // });
        // console.log(allPosts);

        // const data = {
        // img: postPhoto,
        // description: photoName,
        // comments: [],
        // likes: 0,
        // locationName: photoLocationName,
        // geoLocation: currentGeoLocation,
        // };
        // posts.unshift(data);

        // clearData();
        // handleNavigateToPosts();
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
                                        <CameraIcon />
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
                                <MapIcon />
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
                        <TrashIcon />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default CreatePostsScreen;
