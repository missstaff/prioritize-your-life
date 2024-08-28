import { ActivityIndicator } from "react-native";
import { ScaledSheet, s } from "react-native-size-matters";
import AppThemedView  from "./app_components/AppThemedView";
import { COLORS } from "@/constants/Colors";

type SizeType = number | "small" | "large";

interface LoadingSpinnerProps {
  color?: string;
  size?: SizeType;
}

/**
 * Renders a loading spinner component.
 * @param {LoadingSpinnerProps} props - The props for the LoadingSpinner component.
 * @param {string} props.size - The size of the spinner. Defaults to "large".
 * @param {string} props.color - The color of the spinner. Defaults to COLORS.primary.
 * @returns {JSX.Element} The rendered LoadingSpinner component.
 */
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
