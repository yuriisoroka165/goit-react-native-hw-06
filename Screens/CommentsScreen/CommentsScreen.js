import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./CommentsScreenStyles";
import ReturnButton from "../../components/ReturnButton";
import commentatorPhoto from "../../assets/images/comentator.png";
import userPhoto from "../../assets/images/User.jpg";
import CommentComponent from "../../components/CommentComponent";
// import CommentInput from "../../components/CommentInput/CommentInput";
import { SendIcon } from "../../components/SvgIcons/SvgIcons";
import { addComment, getComments } from "../../redux/posts/postsOperations";
// import { selectComments } from "../../redux/posts/postsSelectors";

const CommentsScreen = () => {
    const dispatch = useDispatch();
    // const comments1 = useSelector(selectComments);
    const navigation = useNavigation();
    const {
        params: {
            params: { comments, image },
        },
    } = useRoute();
    // console.log(comments);
    // console.log(image);

    const handleReturnPress = () => {
        navigation.navigate("Home", {
            screen: "PostScreen",
        });
    };

    const handleSubmit = () => {
        dispatch(
            addComment([
                "0tEi41cAAi7kddKF",
                {
                    author: "owner",
                    text: "stohwrgwopebffuweonoweto",
                    date: "09 червня, 2020 | 09:20",
                },
            ])
        );
    };

    return (
        <View style={styles.commentsScreenContainer}>
            <View style={styles.commentsHeaderContainer}>
                <ReturnButton onPress={handleReturnPress}></ReturnButton>
                <Text style={styles.commentsHeader}>Коментарі</Text>
            </View>
            <View
                style={{
                    paddingLeft: 16,
                    paddingRight: 16,
                    marginBottom: 20,
                }}
            >
                <View style={styles.postPhotoContainer}>
                    <Image
                        source={{ uri: image }}
                        style={{
                            width: "100%",
                            height: 240,
                            borderRadius: 8,
                        }}
                    />
                </View>
            </View>
            <ScrollView
                style={{ margin: 0, padding: 0 }}
                showsVerticalScrollIndicator={false}
            >
                {comments.map(({ author, text, date }) => {
                    return (
                        <CommentComponent
                            key={text}
                            author={author}
                            text={text}
                            date={date}
                            userIcon={
                                author === "owner"
                                    ? userPhoto
                                    : commentatorPhoto
                            }
                        />
                    );
                })}
            </ScrollView>
            {/* <CommentInput func={handleSubmit} /> */}
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Коментувати..." />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <SendIcon />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CommentsScreen;
