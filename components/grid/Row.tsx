import { ScaledSheet, s, vs } from "react-native-size-matters";
import { View, ViewStyle } from "react-native";

interface RowProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Row = ({ children, style, ...props }: RowProps) => {
  return (
    <View style={[styles.row, style]} {...props}>
      {children}
    </View>
  );
};

const styles = ScaledSheet.create({
  row: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: s(5),
    paddingVertical: vs(5),
    width: "100%",
  },
});

export default Row;
