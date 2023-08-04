import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";

import { styles } from "./CommentComponentStyles";
import { selectUserId } from "../../redux/authorization/authSelectors";
import { selectCommentatorsPhoto } from "../../redux/posts/postsSelectors";

const CommentComponent = ({ author, text, date }) => {
    const userId = useSelector(selectUserId);

    const commentatorsPhoto = useSelector(state =>
        selectCommentatorsPhoto(state, author)
    );

    const formattedDate = moment(date)
        .utcOffset("+0300")
        .format("DD MMMM, YYYY | HH:mm");
    return (
        <View
            style={[
                styles.commentContainer,
                author === userId ? { flexDirection: "row-reverse" } : {},
            ]}
        >
            <Image
                source={{ uri: commentatorsPhoto }}
                style={styles.userIcon}
            />
            <View
                style={[
                    styles.comment,
                    author === userId
                        ? { borderTopEndRadius: 0, borderTopLeftRadius: 6 }
                        : {},
                ]}
            >
                <Text style={styles.text}>{text}</Text>
                <Text
                    style={[
                        styles.date,
                        author === userId
                            ? { marginRight: "auto", marginLeft: 0 }
                            : {},
                    ]}
                >
                    {formattedDate}
                </Text>
            </View>
        </View>
    );
};

export default CommentComponent;
