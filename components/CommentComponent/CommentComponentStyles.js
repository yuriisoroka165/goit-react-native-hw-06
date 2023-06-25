import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    commentContainer: {
        marginBottom: 18,
        paddingLeft: 16,
        paddingRight: 16,
        minWidth: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 16,
    },
    userIcon: {
        width: 28,
        height: 28,
        borderRadius: 50,
        backgroundColor: "gray",
    },
    comment: {
        maxWidth: 315,
        padding: 16,
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        borderBottomEndRadius: 6,
        borderBottomLeftRadius: 6,
        borderTopEndRadius: 6,
    },
    text: {
        marginBottom: 8,
        fontSize: 13,
        lineHeight: 16,
        color: "#212121",
    },
    date: {
        marginLeft: "auto",
        fontSize: 10,
        color: "#BDBDBD",
    },
});
