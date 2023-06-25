import { useState } from "react";
import { TextInput } from "react-native";

import { styles } from "./InputComponentStyles";

const InputComponent = (props) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TextInput
            style={[styles.textInput, isFocused && styles.focusedTextInput]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
           
        />
    );
};

export default InputComponent;
