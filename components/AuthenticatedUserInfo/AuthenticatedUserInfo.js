import { View, Text, Image } from "react-native";

import { styles } from "./AuthenticatedUserInfoStyles";

const AuthenticatedUserInfo = () => {
    return (
        <View style={styles.userContainer}>
            <Image
                source={require("../../assets/images/User.jpg")}
                style={{ width: 60, height: 60, borderRadius: 16 }}
            />
            <View>
                <Text style={{ fontSize: 13, fontWeight: 700 }}>
                    Natali Romanova
                </Text>
                <Text style={{ fontSize: 11, fontWeight: 400 }}>
                    natali.romanova@gmail.com
                </Text>
            </View>
        </View>
    );
};

export default AuthenticatedUserInfo;
