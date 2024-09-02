import { Text, type TextProps } from "react-native";
import { ScaledSheet, s } from "react-native-size-matters";
import { useThemeColor } from "@/hooks/useThemeColor";
import { COLORS, COLORTHEME } from "@/constants/Colors";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

const AppThemedText = ({
  style,
  type = "default",
  ...rest
}: ThemedTextProps) => {
  const color = useThemeColor(
    { light: COLORTHEME.light.text, dark: COLORTHEME.dark.text },
    "text"
  );

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
};

const styles = ScaledSheet.create({
  default: {
    fontSize: s(16),
    lineHeight: s(24),
  },
  defaultSemiBold: {
    fontSize: s(16),
    fontWeight: "600",
    lineHeight: s(24),
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
    color: COLORS.primary,
    fontSize: s(16),
    lineHeight: s(30),
  },
});

export default AppThemedText;
