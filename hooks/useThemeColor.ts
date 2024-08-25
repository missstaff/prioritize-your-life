import { useColorScheme } from "react-native";
import { COLORTHEME } from "@/constants/Colors";

/**
 * Retrieves the color for a component based on the theme.
 * @param props The component props.
 * @param colorName The color name.
 * @returns The color for the component.
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof COLORTHEME.light & keyof typeof COLORTHEME.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return COLORTHEME[theme][colorName];
  }
}
