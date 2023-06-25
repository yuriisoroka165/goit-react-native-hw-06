import { View, Text, ScrollView } from "react-native";

import { styles } from "./PostsScreenStyles";
import AuthenticatedUserInfo from "../../components/AuthenticatedUserInfo";
import PostComponent from "../../components/PostComponent/PostComponent";
import { posts } from "../../posts";

const PostsScreen = () => {
   
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
