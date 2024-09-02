import React from "react";
import { ScaledSheet, s } from "react-native-size-matters";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import AppThemedText from "./AppThemedText";
import { COLORS } from "@/constants/Colors";

export type ThemedAppThemedTouchableOpacity = TouchableOpacityProps & {
  children: React.ReactNode;
  textStyles?: StyleProp<TextStyle>;
  btnStyles?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const AppThemedTouchableOpacity = ({
  children,
  onPress,
  textStyles,
  btnStyles,
  disabled,
}: ThemedAppThemedTouchableOpacity): JSX.Element => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, btnStyles]}
    >
      <AppThemedText style={[styles.buttonText, textStyles]}>
        {children}
      </AppThemedText>
    </TouchableOpacity>
  );
};

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

export default AppThemedTouchableOpacity;
