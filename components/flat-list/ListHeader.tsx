import { ScaledSheet } from "react-native-size-matters";
import AppThemedText from "../app_components/AppThemedText";
import Column from "../grid/Column";
import Row from "../grid/Row";

export interface ListHeaderProps {
  headings: string[];
  style?: {};
}

const ListHeader = ({ style, headings }: ListHeaderProps) => {
  return (
    <Row>
      {headings.map((heading, index) => (
        <Column key={index}>
          <AppThemedText style={[styles.tableHeader, style]}>
            {heading}
          </AppThemedText>
        </Column>
      ))}
    </Row>
  );
};

const styles = ScaledSheet.create({
  tableHeader: {
    fontWeight: "bold",
  },
});

export default ListHeader;
