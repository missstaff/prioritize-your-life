import { ActivityIndicator, View } from "react-native";
import { ScaledSheet, s } from "react-native-size-matters";
import { COLORS } from "@/constants/Colors";

type SizeType = number | "small" | "large";

interface LoadingSpinnerProps {
  color?: string;
  size?: SizeType;
}

const LoadingSpinner = ({
  size = "large",
  color = COLORS.primary,
}: LoadingSpinnerProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default LoadingSpinner;

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
