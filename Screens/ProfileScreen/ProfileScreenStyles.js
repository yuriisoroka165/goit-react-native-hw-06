import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    profileContainer: {
        position: "relative",
        width: "100%",
        height: "80%",
        marginTop: "auto",
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        display: "flex",
        paddingLeft: 16,
        paddingRight: 16,
    },
    userImageContainer: {
        marginLeft: "auto",
        marginRight: "auto",
        top: -60,
        width: 120,
        height: 120,
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
    },
    profileLogoutButton: {
        position: "absolute",
        top: 22,
        right: 16,
    },
    profileHeader: {
        margin: 0,
        padding: 0,
        marginBottom: 32,
        fontFamily: "Roboto-Bold",
        fontWeight: 500,
        fontSize: 30,
        lineHeight: 35,
        textAlign: "center",
    },
});
