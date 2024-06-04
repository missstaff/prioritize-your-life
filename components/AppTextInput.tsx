
import React from "react";
import { View, TextInput, StyleSheet, } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
{/* {icon && <MaterialCommunityIcons name={icon} size={20} />} */ }

interface AppTextInputProps {
    icon: string;
    placeholder: string;
    secureEntry: boolean;
    value: string;
    setValue: (value: string) => void;
    checkValue: (value: string) => void;
}

const AppTextInput = (
    { 
        checkValue,
        placeholder,
        secureEntry,
        value,
        setValue,
        icon = "",
        ...otherProps 
    }: AppTextInputProps) => {
    return (
        <TextInput
            onBlur={(e) => {
                if (value.length > 0) checkValue(value);
            }}
            onChange={(e) => setValue(e.nativeEvent.text)}
            placeholder={placeholder}
            secureTextEntry={secureEntry}
            style={styles.input}
            value={value}
            {...otherProps}
        />
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        width: "80%",
    },
    button: {
        alignItems: "center",
        backgroundColor: "blue",
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        width: "80%",
    },
    buttonText: {
        color: "white",
    },
    link: {
        color: "blue",
        marginBottom: 10,
    },
});


export default AppTextInput;