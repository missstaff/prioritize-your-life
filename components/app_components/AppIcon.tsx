import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import { View } from "react-native";
import { ScaledSheet, s } from "react-native-size-matters";

const AppIcon = ({
  onPress,
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"] | any>) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons onPress={onPress} size={s(28)} {...rest} />
    </View>
  );
};

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

export default AppIcon;
