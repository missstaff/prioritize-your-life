import { View, type ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  darkColor?: string;
  lightColor?: string;
};

/**
 * AppThemedView component that renders a View with a background color based on the current theme.
 *
 * @param style - The style object to be applied to the View component.
 * @param lightColor - The background color to be used when the theme is set to light.
 * @param darkColor - The background color to be used when the theme is set to dark.
 * @param otherProps - Additional props to be spread onto the View component.
 * @returns The rendered ThemedView component.
 */
export function AppThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
