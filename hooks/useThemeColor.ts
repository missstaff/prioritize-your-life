/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from "react-native";
import { COLORTHEME } from "@/constants/Colors";

/**
 * Get the color for the current theme
 * @param props - The props object
 * @param colorName - The color name
 * @returns The color for the current theme
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
