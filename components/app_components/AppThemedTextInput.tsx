import React, { useState } from "react";
import {
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  Platform,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { ScaledSheet, s } from "react-native-size-matters";
import AppIcon from "./AppIcon";
import AppThemedView  from "./AppThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { COLORTHEME } from "@/constants/Colors";
import { TransactionState } from "@/store/transaction/transaction-reducer";

interface AppThemedTextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  data?: any[] | undefined;
  iconName?: string;
  inputStyle?: StyleProp<TextStyle>;
  keyboardType?: "default" | "numeric";
  placeholder: string;
  secureEntry: boolean;
  value: string;
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
const AppThemedTextInput = ({
  containerStyle,
  data,
  inputStyle,
  iconName,
  keyboardType,
  placeholder,
  secureEntry,
  value,
  checkValue,
  setValue,
  ...rest
}: AppThemedTextInputProps) => {
  const textColor = useThemeColor({}, "text");
  let backgroundColor = useThemeColor(
    { light: COLORTHEME.light.background, dark: COLORTHEME.dark.background },
    "background"
  );

  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureEntry);

  const handleCalendarPress = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        mode: "date",
        value: new Date(),
        onChange: (event, selectedDate) => {
          if (selectedDate) {
            setValue(formatDate(selectedDate));
          }
        },
      });
    }
  };

  return (
    <AppThemedView style={[styles.inputContainer, containerStyle]}>
      <TextInput
        keyboardType={keyboardType}
        onBlur={(e) => {
          if (value.length > 0) checkValue(value);
        }}
        onChangeText={(text) => {
          if (!data?.length && placeholder === "Description") {
            setValue("Initial Balance");
          } else {
            setValue(text);
          }
        }}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={!isPasswordVisible}
        style={[
          styles.input,
          { backgroundColor: backgroundColor, color: textColor },
          inputStyle,
        ]}
        value={value}
        {...rest}
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

      {iconName && (
        <TouchableOpacity
          onPress={() => iconName === "calendar" && handleCalendarPress()}
        >
          <AppIcon name={iconName} size={s(24)} color="#ccc" />
        </TouchableOpacity>
      )}
    </AppThemedView>
  );
};

const styles = ScaledSheet.create({
  inputContainer: {
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: s(5),
    borderWidth: s(1),
    flexDirection: "row",
    marginBottom: s(10),
    paddingHorizontal: s(10),
    width: "80%",
  },
  input: {
    flex: 1,
    padding: s(10),
  },
});

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export default AppThemedTextInput;
