import { ScaledSheet, s, vs } from "react-native-size-matters";
import AppThemedView from "../app_components/AppThemedView";
import { COLORS } from "@/constants/Colors";

interface ListWrapperProps {
  children: React.ReactNode;
}

const ListWrapper = ({ children }: ListWrapperProps): JSX.Element => {
  return <AppThemedView style={styles.container}>{children}</AppThemedView>;
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
