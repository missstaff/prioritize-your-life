import { ScaledSheet, s, vs } from "react-native-size-matters";
import AppThemedView  from "../app_components/AppThemedView";

interface RowProps {
  children: React.ReactNode;
}
/**
 * Renders a row component.
 * @param {RowProps} props - The props for the Row component.
 * @param {React.ReactNode} props.children - The children to be rendered inside the row.
 * @returns {JSX.Element} The rendered Row component.
 */
const Row = ({ children, ...props }: RowProps) => {
  return (
    <AppThemedView style={styles.row} {...props}>
      {children}
    </AppThemedView>
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
