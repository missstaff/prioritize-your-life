import React from "react";
import { ScaledSheet, s } from "react-native-size-matters";
import { Link } from "expo-router";
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";

//create types for the props
interface AppThemedLinkProps {
  to: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}


/**
 * A custom link component that applies theme-based styling.
 * @param to - The path to navigate to.
 * @param children - The children to be rendered in the link.
 * @param style - The style object to be applied to the link component.
 * @returns The AppThemedLink component.
 */
const AppThemedLink = ({
  to,
  children,
  style,
}: AppThemedLinkProps) => {
  return (
    <TouchableOpacity>
      <Link href={to} style={[styles.link, style]}>
        {children}
      </Link>
    </TouchableOpacity>
  );
};
const styles = ScaledSheet.create({
  link: {
    color: "blue",
    marginBottom: s(10),
  },
});

export default AppThemedLink;
