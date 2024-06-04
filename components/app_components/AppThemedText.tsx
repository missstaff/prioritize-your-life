import { Text, type TextProps } from "react-native";
import { ScaledSheet, s } from "react-native-size-matters";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

/**
 * A custom text component that applies theme-based styling.
 * @param style - The style object to be applied to the text component.
 * @param lightColor - The color to be used when the theme is light.
 * @param darkColor - The color to be used when the theme is dark.
 * @param type - The type of text styling to be applied.
 * @param rest - Additional props to be passed to the text component.
 * @returns The ThemedText component.
 */
export function AppThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = ScaledSheet.create({
  default: {
    fontSize: s(16),
    lineHeight: s(24),
  },
  defaultSemiBold: {
    fontSize: s(16),
    lineHeight: s(24),
    fontWeight: "600",
  },
  title: {
    fontSize: s(32),
    fontWeight: "bold",
    lineHeight: s(32),
  },
  subtitle: {
    fontSize: s(20),
    fontWeight: "bold",
  },
  link: {
    lineHeight: s(30),
    fontSize: s(16),
    color: "#0a7ea4",
  },
});
