import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    registrationContainer: {
        width: "100%",
        height: "70%",
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
    registrationForm: {
        display: "flex",
        gap: 16,
        marginBottom: 40,
    },
    registrationFormHeader: {
        margin: 0,
        padding: 0,
        marginBottom: 32,
        fontFamily: "Roboto-Bold",
        fontWeight: 500,
        fontSize: 30,
        lineHeight: 35,
        textAlign: "center",
    },
    registrationFormSubmitButton: {
        width: "100%",
        height: 50,
        marginBottom: 16,
        padding: 16,
        borderRadius: 100,
        backgroundColor: "#FF6C00",
    },
});
