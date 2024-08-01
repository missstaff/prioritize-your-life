import { s, ScaledSheet, vs } from "react-native-size-matters";
import { AppThemedView } from "../app_components/AppThemedView";

interface RowProps {
  children: React.ReactNode;
  onTouchStart?: () => void;
}
const Row = ({ children, onTouchStart, ...props }: RowProps) => {
  return(
    <AppThemedView onTouchStart={onTouchStart} style={styles.row} {...props}>{children}</AppThemedView>
  );
};

const styles = ScaledSheet.create({
  row: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: s(5),
    paddingVertical: vs(5),
    width: "100%",
  },
});

export default Row;
