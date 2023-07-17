import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";

import { styles } from "./AuthenticatedUserInfoStyles";
import { selectUserPhoto } from "../../redux/authorization/authSelectors";

const AuthenticatedUserInfo = () => {
    const userPhoto = useSelector(selectUserPhoto);
    return (
        <View style={styles.userContainer}>
            <Image
                // source={require("../../assets/images/User.jpg")}
                source={{ uri: userPhoto }}
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
