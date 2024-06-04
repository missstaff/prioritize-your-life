import React from "react";
import { ScaledSheet, s } from "react-native-size-matters";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedAppTouchableOpacity = TouchableOpacityProps & {
  children: React.ReactNode;
  darkColor?: string;
  lightColor?: string;
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
  lightColor,
  darkColor,
}: ThemedAppTouchableOpacity): JSX.Element => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{children}</Text>
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
