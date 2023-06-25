import { View, TextInput, TouchableOpacity } from "react-native";

import { styles } from "./CommentInputStyles";
import { SendIcon } from "../SvgIcons/SvgIcons";

const CommentInput = () => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Коментувати..." />
            <TouchableOpacity style={styles.button}>
                <SendIcon />
            </TouchableOpacity>
        </View>
    );
};

export default CommentInput;
