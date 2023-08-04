import { View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { styles } from "./PostsScreenStyles";
import AuthenticatedUserInfo from "../../components/AuthenticatedUserInfo";
import PostComponent from "../../components/PostComponent/PostComponent";
import { selectAllPosts } from "../../redux/posts/postsSelectors";
import {
    getCommmentatorsPhoto,
    getPosts,
} from "../../redux/posts/postsOperations";

const PostsScreen = () => {
    const posts = useSelector(selectAllPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
        dispatch(getCommmentatorsPhoto());
    }, [posts]);

    return (
        <View style={styles.postsScreenContainer}>
            <AuthenticatedUserInfo />
            <ScrollView
                style={{ margin: 0, padding: 16 }}
                showsVerticalScrollIndicator={false}
            >
                {posts.length === 0 ? (
                    <View></View>
                ) : (
                    posts.map(item => {
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
                    })
                )}
            </ScrollView>
        </View>
    );
};

export default PostsScreen;
