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
  checkValue: (value: string) => void;
  setValue: (value: string) => void;
}


/**
 * AppThemedTextInput component.
 * 
 * @param checkValue - Function to check the value of the input.
 * @param iconName - Name of the icon to display.
 * @param placeholder - Placeholder text for the input.
 * @param secureEntry - Boolean indicating whether the input should be secure (password) or not.
 * @param setValue - Function to set the value of the input.
 * @param containerStyle - Additional styles for the input container.
 * @param inputStyle - Additional styles for the input.
 * @param value - Current value of the input.
 * @param otherProps - Additional props to pass to the TextInput component.
 * @returns The rendered AppThemedTextInput component.
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
