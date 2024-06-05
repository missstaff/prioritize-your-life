import React, { useState } from "react";
import { View, Text, TextInput, StyleProp, ViewStyle, TouchableOpacity } from "react-native";
import { ScaledSheet, s } from "react-native-size-matters";
import { AppIcon } from "./AppIcon";
import { useThemeColor } from "@/hooks/useThemeColor";

interface AppThemedTextInputProps {
  darkColor?: string;
  iconName?: string;
  lightColor?: string;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  secureEntry: boolean;
  value: string;
  checkValue: (value: string) => void;
  setValue: (value: string) => void;
}

/**
 * A themed text input component for the app.
 * @param props The component props.
 * @returns The rendered component.
 */
const AppThemedTextInput = ({
  checkValue,
  darkColor,
  iconName,
  lightColor,
  placeholder,
  secureEntry,
  setValue,
  style,
  value,
  ...otherProps
}: AppThemedTextInputProps) => {
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureEntry);

  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        onBlur={(e) => {
          if (value.length > 0) checkValue(value);
        }}
        onChange={(e) => setValue(e.nativeEvent.text)}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={!isPasswordVisible}
        style={[styles.input, {backgroundColor: backgroundColor, color: textColor}, styles.input]}
        value={value}
        {...otherProps}
      />
      {secureEntry && (
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <AppIcon
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={s(24)}
            color="#999"
            style={styles.icon}
          />
        </TouchableOpacity>
      )}

      {iconName && (
          <AppIcon
          name={iconName}
          size={s(24)}
          color="#999"
          style={styles.icon}
        />
      )}
    </View>
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
  icon: {
    marginLeft: s(10),
  },
});

export default AppThemedTextInput;
