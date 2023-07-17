import { View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
// import { useRoute } from "@react-navigation/native";

import { styles } from "./PostsScreenStyles";
import AuthenticatedUserInfo from "../../components/AuthenticatedUserInfo";
import PostComponent from "../../components/PostComponent/PostComponent";
import { posts } from "../../posts";
import {
    selectUserPhoto,
    selectIsAuthorized,
    selectUserId,
} from "../../redux/authorization/authSelectors";

const PostsScreen = () => {
    // const userPhoto = useSelector(selectUserPhoto);
    // const isAuthorized = useSelector(selectIsAuthorized);
    // const useId = useSelector(selectUserId);
    // console.log(userPhoto);
    // console.log(isAuthorized);
    // console.log(useId);

    return (
        <View style={styles.postsScreenContainer}>
            <AuthenticatedUserInfo />
            <ScrollView
                style={{ margin: 0, padding: 16 }}
                showsVerticalScrollIndicator={false}
            >
                {posts.map(
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
                )}
            </ScrollView>
        </View>
    );
};

export default PostsScreen;
