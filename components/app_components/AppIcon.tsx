import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import { View } from "react-native";
import { ScaledSheet, s } from "react-native-size-matters";


/**
 * Renders an application icon.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.style - The style object to apply to the container view.
 * @param {string} props.rest - The rest of the props to pass to the Ionicons component.
 * @returns {JSX.Element} The rendered AppIcon component.
 */
export function AppIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"] | any>) {
  return (
    <View style={[styles.container, style]}>
      <Ionicons size={s(28)} {...rest} />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: s(2.5),
  },
});
