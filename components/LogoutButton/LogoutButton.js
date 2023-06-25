import React from "react";
import { Svg, Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";

import { styles } from "./LogoutButtonStyles";
import { LogoutButtonIcon } from "../SvgIcons/SvgIcons";

const LogoutButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.logoutButton} onPress={onPress}>
            <LogoutButtonIcon />
        </TouchableOpacity>
    );
};

export default LogoutButton;
