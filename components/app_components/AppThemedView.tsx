import { View, type ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { COLORTHEME } from "@/constants/Colors";

export type ThemedViewProps = ViewProps & {
  darkColor?: string;
  lightColor?: string;
};

/**
 * Renders a themed view component with customizable style and other props.
 * @param {ThemedViewProps} props - The props for the AppThemedView component.
 * @param {ViewStyle} props.style - The style object for the component.
 * @param {any} props.otherProps - Other props to be spread on the component.
 * @returns {JSX.Element} The rendered AppThemedView component.
 */
export function AppThemedView({ style, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: COLORTHEME.light.background, dark: COLORTHEME.dark.background },
    "background"
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
