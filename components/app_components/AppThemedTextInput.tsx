import React, { useState } from "react";
import {
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ScaledSheet, s } from "react-native-size-matters";
import { AppIcon } from "./AppIcon";
import { AppThemedView } from "./AppThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { COLORTHEME } from "@/constants/Colors";

interface AppThemedTextInputProps {
  iconName?: string;
  placeholder: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  secureEntry: boolean;
  value: string;
  keyboardType?: "default" | "numeric";
  checkValue: (value: string) => void;
  setValue: (value: string) => void;
}

/**
 * Represents a themed text input component.
 * @param {AppThemedTextInputProps} props - The props for the themed text input component.
 * @param {string} props.iconName - The name of the icon to display.
 * @param {string} props.placeholder - The placeholder text for the input.
 * @param {StyleProp<ViewStyle>} props.containerStyle - The custom style for the container.
 * @param {StyleProp<TextStyle>} props.inputStyle - The custom style for the input.
 * @param {boolean} props.secureEntry - Indicates if the input is a password field.
 * @param {string} props.value - The value of the input.
 * @param {(value: string) => void} props.checkValue - The function to check the value of the input.
 * @param {(value: string) => void} props.setValue - The function to set the value of the input.
 * @returns {JSX.Element} The themed text input component.
 */
export const AppThemedTextInput = ({
  checkValue,
  iconName,
  placeholder,
  secureEntry,
  setValue,
  containerStyle,
  inputStyle,
  value,
  keyboardType,
  ...otherProps
}: AppThemedTextInputProps) => {
  const textColor = useThemeColor({}, "text");
  let backgroundColor = useThemeColor(
    { light: COLORTHEME.light.background, dark: COLORTHEME.dark.background },
    "background"
  );

  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureEntry);

  return (
    <AppThemedView style={[styles.inputContainer, containerStyle]}>
      <TextInput
        keyboardType={keyboardType}
        onBlur={(e) => {
          if (value.length > 0) checkValue(value);
        }}
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={!isPasswordVisible}
        style={[
          styles.input,
          { backgroundColor: backgroundColor, color: textColor },
          inputStyle,
        ]}
        value={value}
        {...otherProps}
      />
      {secureEntry && (
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          testID="passwordVisibilityToggle"
        >
          <AppIcon
            name={!isPasswordVisible ? "eye-off" : "eye"}
            size={s(24)}
            color="#ccc"
          />
        </TouchableOpacity>
      )}

      {iconName && <AppIcon name={iconName} size={s(24)} color="#ccc" />}
    </AppThemedView>
  );
};

const styles = ScaledSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: s(1),
    borderRadius: s(5),
    marginBottom: s(10),
    paddingHorizontal: s(10),
    width: "80%",
  },
  input: {
    flex: 1,
    padding: s(10),
  },
});

export default AppThemedTextInput;
