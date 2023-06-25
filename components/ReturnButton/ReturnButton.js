import React from "react";
import { Svg, Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";

import { styles } from "./ReturnButtonStyles";

const ReturnButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.returnButton} onPress={onPress}>
            <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Path
                    d="M20 12H4"
                    stroke="#212121"
                    stroke-opacity="0.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <Path
                    d="M10 18L4 12L10 6"
                    stroke="#212121"
                    stroke-opacity="0.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </Svg>
        </TouchableOpacity>
    );
};

export default ReturnButton;
