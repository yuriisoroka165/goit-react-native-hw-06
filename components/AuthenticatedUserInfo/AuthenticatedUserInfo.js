import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";

import { styles } from "./AuthenticatedUserInfoStyles";
import {
    selectUserPhoto,
    selectUserName,
    selectUserEmail,
} from "../../redux/authorization/authSelectors";
import comentatorPhoto from "../../assets/images/comentator.png";

const AuthenticatedUserInfo = () => {
    const userPhoto = useSelector(selectUserPhoto);
    const userName = useSelector(selectUserName);
    const userEmail = useSelector(selectUserEmail);
    return (
        <View style={styles.userContainer}>
            <Image
                source={{ uri: userPhoto }}
                style={{ width: 60, height: 60, borderRadius: 16 }}
            />
            <View>
                <Text style={{ fontSize: 13, fontWeight: 700 }}>
                    {userName}
                </Text>
                <Text style={{ fontSize: 11, fontWeight: 400 }}>
                    {userEmail}
                </Text>
            </View>
        </View>
    );
};

export default AuthenticatedUserInfo;
