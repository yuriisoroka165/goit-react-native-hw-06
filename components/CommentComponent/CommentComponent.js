import { View, Text, Image } from "react-native";

import { styles } from "./CommentComponentStyles";

const CommentComponent = ({ author, text, date, userIcon }) => {
    return (
        <View
            style={[
                styles.commentContainer,
                author === "owner" ? { flexDirection: "row-reverse" } : {},
            ]}
        >
            <Image source={userIcon} style={styles.userIcon} />
            <View
                style={[
                    styles.comment,
                    author === "owner"
                        ? { borderTopEndRadius: 0, borderTopLeftRadius: 6 }
                        : {},
                ]}
            >
                <Text style={styles.text}>{text}</Text>
                <Text
                    style={[
                        styles.date,
                        author === "owner"
                            ? { marginRight: "auto", marginLeft: 0 }
                            : {},
                    ]}
                >
                    {date}
                </Text>
            </View>
        </View>
    );
};

export default CommentComponent;
