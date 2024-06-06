import React from "react";
import { ScaledSheet, s } from "react-native-size-matters";
import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import { AppThemedText } from "./AppThemedText";

export type ThemedAppTouchableOpacity = TouchableOpacityProps & {
  children: React.ReactNode;
  textStyles?: StyleProp<ViewStyle>;
  btnStyles?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

/**
 * Custom TouchableOpacity component for the app.
 *
 * @component
 * @param {TouchableOpacityProps} props - The TouchableOpacity props.
 * @returns {JSX.Element} - The rendered TouchableOpacity component.
 */
const AppTouchableOpacity = ({
  children,
  onPress,
  textStyles,
  btnStyles,
}: ThemedAppTouchableOpacity): JSX.Element => {
  
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, btnStyles]}>
      <AppThemedText style={[styles.buttonText, textStyles]}>{children}</AppThemedText>
    </TouchableOpacity>
  );
};

export default AppTouchableOpacity;

const styles = ScaledSheet.create({
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
});
