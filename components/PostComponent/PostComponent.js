import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./PostComponentStyles";
import {
    CommentIcon,
    CommentOrangeIcon,
    LikesIcon,
    MapIcon,
} from "../SvgIcons/SvgIcons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getComments } from "../../redux/posts/postsOperations";

const PostComponent = ({
    image,
    description,
    comments,
    likes,
    locationName,
    geoLocation,
    id
}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();


    // useEffect(() => {
    //     dispatch(getComments());
    // }, [comments]);

    return (
        <View style={{ position: "relative", marginBottom: 32 }}>
            <Image
                source={{ uri: image }}
                style={{
                    width: "100%",
                    height: 240,
                    marginBottom: 8,
                    borderRadius: 8,
                }}
            />
            <Text style={{ marginBottom: 8 }}>{description}</Text>
            <View style={styles.componentsContainer}>
                <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("CommentsScreen", {
                                params: { comments, image, id },
                            })
                        }
                    >
                        {Object.values(comments).length === 0 ? (
                            <CommentIcon />
                        ) : (
                            <CommentOrangeIcon />
                        )}
                    </TouchableOpacity>
                    <Text>{comments.length}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
                    <LikesIcon />
                    <Text>{likes}</Text>
                </View>
                <View
                    style={{
                        marginLeft: "auto",
                        display: "flex",
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("MapScreen", {
                                params: geoLocation,
                            })
                        }
                    >
                        <MapIcon />
                    </TouchableOpacity>
                    <Text>{locationName}</Text>
                </View>
            </View>
        </View>
    );
};

export default PostComponent;
