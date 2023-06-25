import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    containerFullView: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    mapStyles: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});
