import { ScaledSheet, s, vs } from "react-native-size-matters";
import { COLORS } from "@/constants/Colors";
import { View, ViewStyle } from "react-native";

interface ListWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const ListWrapper = ({ children, style }: ListWrapperProps): JSX.Element => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = ScaledSheet.create({
  container: {
    borderRadius: s(10),
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100%",
    maxHeight: "100%",
    marginVertical: vs(5),
    marginHorizontal: s(15),
    paddingVertical: s(10),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: s(5),
  },
});

export default ListWrapper;
