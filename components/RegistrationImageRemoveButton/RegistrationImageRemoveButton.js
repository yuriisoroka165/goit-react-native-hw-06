import React from "react";
import { TouchableOpacity } from "react-native";

import { styles } from "./RegistrationImageRemoveButtonStyles";
import { RemoveIcon } from "../SvgIcons/SvgIcons";

const RegistrationImageRemoveButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.removeImageButton} onPress={onPress}>
            <RemoveIcon />
        </TouchableOpacity>
    );
};

export default RegistrationImageRemoveButton;
