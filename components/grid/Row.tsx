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
    width: "100%",
    justifyContent: "space-evenly",
  },
});

export default Row;
