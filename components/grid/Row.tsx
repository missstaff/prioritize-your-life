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
    display: "flex",
    flexDirection: "row",
    paddingVertical: vs(5),
    paddingHorizontal: s(10),
    width: "100%",
    justifyContent: "space-between",
  },
});

export default Row;
