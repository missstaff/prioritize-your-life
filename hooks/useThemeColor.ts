import { useColorScheme } from "react-native";
import { COLORTHEME } from "@/constants/Colors";


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
