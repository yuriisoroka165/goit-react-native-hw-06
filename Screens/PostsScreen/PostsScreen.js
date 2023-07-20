import { View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./PostsScreenStyles";
import AuthenticatedUserInfo from "../../components/AuthenticatedUserInfo";
import PostComponent from "../../components/PostComponent/PostComponent";
import { selectAllPosts } from "../../redux/posts/postsSelectors";

const PostsScreen = () => {
    const posts = useSelector(selectAllPosts);

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
            </ScrollView>
        </View>
    );
};

export default PostsScreen;
