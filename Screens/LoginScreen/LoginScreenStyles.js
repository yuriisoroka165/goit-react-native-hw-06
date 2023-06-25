import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    loginContainer: {
        width: "100%",
        height: "60%",
        marginTop: "auto",
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        display: "flex",
        paddingLeft: 16,
        paddingRight: 16,
    },
    loginForm: {
        display: "flex",
        gap: 16,
        marginBottom: 40,
    },
    loginFormHeader: {
        marginTop: 32,
        marginBottom: 32,
        fontFamily: "Roboto-Bold",
        fontWeight: 500,
        fontSize: 30,
        lineHeight: 35,
        textAlign: "center",
    },
    loginFormSubmitButton: {
        width: "100%",
        height: 50,
        marginBottom: 16,
        padding: 16,
        borderRadius: 100,
        backgroundColor: "#FF6C00",
    },
});
