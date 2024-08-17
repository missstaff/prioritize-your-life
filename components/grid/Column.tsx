import { ScaledSheet } from "react-native-size-matters";
import { AppThemedView } from "../app_components/AppThemedView";

interface ColumnProps {
  children: React.ReactNode;
  inlineStyles?: object;
}

/**
 * Represents a column component.
 * @param {ColumnProps} props - The props for the column component.
 * @param {React.ReactNode} props.children - The children to be rendered inside the column.
 * @returns {JSX.Element} The rendered column component.
 */
const Column = ({ children, inlineStyles, ...props }: ColumnProps) => {
  return (
    <AppThemedView style={[styles.column, inlineStyles]} {...props}>
      {children}
    </AppThemedView>
  );
};

const styles = ScaledSheet.create({
  column: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    width: "33%",
  },
});

export default Column;
