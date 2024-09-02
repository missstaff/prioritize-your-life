import { ScaledSheet } from "react-native-size-matters";
import AppThemedView from "../app_components/AppThemedView";

interface ColumnProps {
  children: React.ReactNode;
  inlineStyles?: object;
}

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
