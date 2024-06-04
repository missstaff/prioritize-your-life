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
  lightColor?: string;
  darkColor?: string;
}

const AppThemedLink = ({
  to,
  children,
  style,
  lightColor,
  darkColor,
}: AppThemedLinkProps) => {
  return (
    <TouchableOpacity>
      <Link href={to} style={styles.link}>
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
