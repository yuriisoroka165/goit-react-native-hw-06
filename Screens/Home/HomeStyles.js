import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    homePageHeader: {
        fontSize: 17,
        fontWeight: 500,
    },
    homeContainer: {
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        tabBarStyle: {
            height: 70,
            paddingTop: 9,
            paddingBottom: 22,
            paddingHorizontal: 82,
            borderTopWidth: 1,
            borderColor: "#E5E5E5",
        },
    },
    logOutButton: { marginRight: 16 },
    returnButton: { marginLeft: 16 },
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
