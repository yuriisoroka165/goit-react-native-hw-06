import React from "react";
import { TouchableOpacity } from "react-native";

import { styles } from "./RegistrationImageAddButtonStyles";
import { PlusIcon } from "../SvgIcons/SvgIcons";

const RegistrationImageAddButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.addImageButton} onPress={onPress}>
            <PlusIcon />
        </TouchableOpacity>
    );
};

export default RegistrationImageAddButton;
