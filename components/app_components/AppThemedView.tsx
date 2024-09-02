import { View, type ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { COLORTHEME } from "@/constants/Colors";

export type ThemedViewProps = ViewProps & {
  darkColor?: string;
  lightColor?: string;
};

export default function AppThemedView({
  style,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: COLORTHEME.light.background, dark: COLORTHEME.dark.background },
    "background"
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
