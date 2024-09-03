import { ScaledSheet } from "react-native-size-matters";
import { View, ViewStyle } from "react-native";

interface ColumnProps {
  children: React.ReactNode;
  colStyles?: ViewStyle;
}

const Column = ({ children, colStyles, ...props }: ColumnProps) => {
  return (
    <View style={[styles.column, colStyles]} {...props}>
      {children}
    </View>
  );
};

const styles = ScaledSheet.create({
  column: {
    display: "flex",
    flexDirection: "column",
    // flexGrow: 1,
  },
});

export default Column;
