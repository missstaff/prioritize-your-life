import React from "react";
import { StyleProp, TextInput, ViewStyle } from "react-native";
import { ScaledSheet, s } from "react-native-size-matters";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
{
  /* {icon && <MaterialCommunityIcons name={icon} size={20} />} */
}

interface AppThemedTextInputProps {
  darkColor?: string;
  icon?: string;
  lightColor?: string;
  style?: StyleProp<ViewStyle>;
  placeholder: string;
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
  icon,
  lightColor,
  placeholder,
  secureEntry,
  setValue,
  style,
  value,
  ...otherProps
}: AppThemedTextInputProps) => {
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
const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: s(1),
    borderRadius: s(5),
    marginBottom: s(10),
    padding: s(10),
    width: "80%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: s(5),
    marginBottom: s(10),
    padding: s(10),
    width: "80%",
  },
  buttonText: {
    color: "white",
  },
  link: {
    color: "blue",
    marginBottom: s(10),
  },
});

export default AppThemedTextInput;
