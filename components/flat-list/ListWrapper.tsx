import { ScaledSheet, s, vs } from "react-native-size-matters";
import AppThemedView from "../app_components/AppThemedView";
import { COLORS } from "@/constants/Colors";
import { View } from "react-native";

interface ListWrapperProps {
  children: React.ReactNode;
}

const ListWrapper = ({ children }: ListWrapperProps): JSX.Element => {
  return <View style={styles.container}>{children}</View>;
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
    paddingHorizontal: s(25),
    paddingVertical: s(10),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: s(5),
    width: "100%",
  },
});

export default ListWrapper;
