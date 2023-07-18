import { View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import { useRoute } from "@react-navigation/native";

import { styles } from "./PostsScreenStyles";
import AuthenticatedUserInfo from "../../components/AuthenticatedUserInfo";
import PostComponent from "../../components/PostComponent/PostComponent";
// import { posts } from "../../posts";
// import {
//     selectUserPhoto,
//     selectIsAuthorized,
//     selectUserId,
// } from "../../redux/authorization/authSelectors";
import { getPosts } from "../../redux/posts/postsOperations";
import { selectAllPosts } from "../../redux/posts/postsSelectors";
import { useEffect } from "react";

const PostsScreen = () => {
    // const userPhoto = useSelector(selectUserPhoto);
    // const isAuthorized = useSelector(selectIsAuthorized);
    // const useId = useSelector(selectUserId);
    // console.log(userPhoto);
    // console.log(isAuthorized);
    // console.log(useId);
    const posts = useSelector(selectAllPosts);
    // console.log(posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, []);

    return (
        <View style={styles.postsScreenContainer}>
            <AuthenticatedUserInfo />
            <ScrollView
                style={{ margin: 0, padding: 16 }}
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
                {/* {posts.map(
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
                )} */}
            </ScrollView>
        </View>
    );
};

export default PostsScreen;
