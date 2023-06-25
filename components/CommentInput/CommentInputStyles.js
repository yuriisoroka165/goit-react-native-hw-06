import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        position: "relative",
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        minWidth: "100%",
    },
    input: {
        height: 50,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderRadius: 100,
        backgroundColor: "#F6F6F6",
    },
    button: {
        position: "absolute",
        right: 24,
        top: 8,
        width: 34,
        height: 34,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: "#FF6C00",
    },
});
