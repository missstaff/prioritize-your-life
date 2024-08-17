import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

/**
 * Renders a tab bar icon using the Ionicons component.
 * @param {IconProps<ComponentProps<typeof Ionicons>["name"]>} props - The props for the TabBarIcon component.
 * @returns {JSX.Element} The rendered TabBarIcon component.
 */
export function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>): JSX.Element {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
