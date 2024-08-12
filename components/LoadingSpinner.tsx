import { COLORS } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { s, ScaledSheet } from "react-native-size-matters";
import { AppThemedView } from "./app_components/AppThemedView";

type SizeType = number | "small" | "large";

interface LoadingSpinnerProps {
  color?: string;
  size?: SizeType;
}

export default function LoadingSpinner({
  size = "large",
  color = COLORS.primary,
}: LoadingSpinnerProps) {
  return (
    <AppThemedView style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </AppThemedView>
  );
}

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: s(10),
  },
});
