import React from "react";
import { View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

/**
 * An icon component for the app.
 * @param props The component props.
 * @returns The rendered component.
 */
export function AppIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name'] | any>) {
  
  return (
    <View
    style={[
      {
        alignItems: "center",
        backgroundColor: "transparent",
        borderRadius: 50,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
    ]}
  >
    <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />
  </View>
  );
};
