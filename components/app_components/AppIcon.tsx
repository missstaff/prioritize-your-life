import React from "react";
import { s } from "react-native-size-matters";
import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

/**
 * An icon component for the app.
 * @param props The component props.
 * @returns The rendered component.
 */
export function AppIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"] | any>) {
  return (
    <View
      style={[
        {
          alignItems: "center",
          backgroundColor: "transparent",
          borderRadius: 100,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: s(2.5),
        },
        style,
      ]}
    >
      <Ionicons size={s(28)} {...rest} />
    </View>
  );
}
