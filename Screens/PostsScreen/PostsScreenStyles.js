import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    postsScreenContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
    },
    postsScreenHeaderContainer: {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        width: "100%",
        height: 90,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 12,
        borderStyle: "solid",
        borderColor: "#E8E8E8",
        borderBottomWidth: 1,
        // backgroundColor: "#000000"
    },
    postsScreenHeader: {
        marginLeft: "auto",
        marginRight: "auto",
        fontWeight: 500,
        fontSize: 17,
    },
});
