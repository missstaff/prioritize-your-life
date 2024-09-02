import AppThemedText from "../app_components/AppThemedText";
import Column from "../grid/Column";
import Row from "../grid/Row";

export interface ListHeaderProps {
  headings: string[];
  styles: {};
}

const ListHeader = ({ styles, headings }: ListHeaderProps) => {
  return (
    <Row>
      {headings.map((heading, index) => (
        <Column key={index}>
          <AppThemedText style={styles}>{heading}</AppThemedText>
        </Column>
      ))}
    </Row>
  );
};

export default ListHeader;
