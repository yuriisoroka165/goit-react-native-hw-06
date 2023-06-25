import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    appControlsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 30,
        alignItems: "center",
        width: "100%",
        height: 90,
        marginTop: "auto",
        paddingLeft: 16,
        paddingRight: 16,
        borderStyle: "solid",
        borderColor: "#E8E8E8",
        borderTopWidth: 1,
    },

    addButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        height: 40,
        backgroundColor: "#FF6C00",
        borderRadius: 20,
    },
});
