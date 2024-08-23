import React from "react";
import { View } from "react-native";
import { ScaledSheet, s } from "react-native-size-matters";
import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

/**
 * Renders an app icon component.
 *
 * @param style - The style object for the component.
 * @param rest - Additional props for the component.
 * @returns The rendered app icon component.
 */
export function AppIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"] | any>): JSX.Element {
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
