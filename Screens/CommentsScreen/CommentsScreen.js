import React, { useState, useEffect, useRef } from "react";
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
import urid from "urid";

import { styles } from "./CommentsScreenStyles";
import ReturnButton from "../../components/ReturnButton";
import commentatorPhoto from "../../assets/images/comentator.png";
import CommentComponent from "../../components/CommentComponent";
import { SendIcon } from "../../components/SvgIcons/SvgIcons";
import { addComment, getPosts } from "../../redux/posts/postsOperations";
import {
    selectUserId,
    selectUserPhoto,
} from "../../redux/authorization/authSelectors";
import { selectComments } from "../../redux/posts/postsSelectors";

const CommentsScreen = () => {
    const [comment, setComment] = useState("");
    const userId = useSelector(selectUserId);
    const dispatch = useDispatch();
    const userPhoto = useSelector(selectUserPhoto);
    // зроби загрузку фотки коментатора
    // const commentatorPhoto = "dfignedjnfg";
    const navigation = useNavigation();
    const {
        params: {
            params: { image, id },
        },
    } = useRoute();
    const comments = useSelector(state => selectComments(state, id));
    console.log(comments);

    // const storedComments = useRef(comments);

    // проблема зациклення
    useEffect(() => {
        dispatch(getPosts());
        // if (storedComments === comments) {
        //     return;
        // }
    }, []);

    const handleReturnPress = () => {
        navigation.navigate("Home", {
            screen: "PostScreen",
        });
    };

    const handleSubmit = () => {
        dispatch(
            addComment([
                id,
                {
                    id: urid(),

                    author: userId,
                    text: comment,
                    date: new Date(),
                },
            ])
        );
        setComment("");
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
                {comments ? (
                    Object.values(comments).map(
                        ({ id, author, text, date }) => {
                            return (
                                <CommentComponent
                                    key={id}
                                    author={author}
                                    text={text}
                                    date={date}
                                    userIcon={
                                        author === userId
                                            ? userPhoto
                                            : commentatorPhoto
                                    }
                                />
                            );
                        }
                    )
                ) : (
                    <View></View>
                )}
            </ScrollView>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    type={"text"}
                    name={"comment"}
                    placeholder="Коментувати..."
                    value={comment}
                    onChangeText={setComment}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <SendIcon />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CommentsScreen;
