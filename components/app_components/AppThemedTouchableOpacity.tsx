import React from "react";
import { ScaledSheet, s } from "react-native-size-matters";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { AppThemedText } from "./AppThemedText";
import { COLORS } from "@/constants/Colors";

export type ThemedAppThemedTouchableOpacity = TouchableOpacityProps & {
  children: React.ReactNode;
  textStyles?: StyleProp<TextStyle>;
  btnStyles?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

/**
 * Custom TouchableOpacity component for the app.
 * @param {TouchableOpacityProps} props - The TouchableOpacity props.
 * @param {React.ReactNode} props.children - The children to be rendered inside the TouchableOpacity.
 * @param {StyleProp<ViewStyle>} props.textStyles - The styles to be applied to the text inside the TouchableOpacity.
 * @param {StyleProp<ViewStyle>} props.btnStyles - The styles to be applied to the TouchableOpacity.
 * @param {Function} props.onPress - The function to be called when the TouchableOpacity is pressed.
 * @param {boolean} props.disabled - A boolean value to disable the TouchableOpacity.
 * @returns {JSX.Element} - The rendered TouchableOpacity component.
 */
const AppThemedTouchableOpacity = ({
  children,
  onPress,
  textStyles,
  btnStyles,
  disabled
}: ThemedAppThemedTouchableOpacity): JSX.Element => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.button, btnStyles]}>
      <AppThemedText style={[styles.buttonText, textStyles]}>
        {children}
      </AppThemedText>
    </TouchableOpacity>
  );
};

export default AppThemedTouchableOpacity;

const styles = ScaledSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: s(5),
    marginBottom: s(10),
    padding: s(10),
    width: "80%",
  },
  buttonText: {
    color: COLORS.white,
  },
});
