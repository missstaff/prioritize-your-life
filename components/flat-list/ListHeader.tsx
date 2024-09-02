import AppThemedText from "../app_components/AppThemedText";
import Column from "../grid/Column";
import Row from "../grid/Row";
import { TextStyle, ViewStyle } from "react-native";

export interface ListHeaderProps {
  headings: string[];
  colStyles?: ViewStyle;
  rowStyles?: ViewStyle;
  textStyles?: TextStyle;
}

const ListHeader = ({ headings, colStyles, textStyles, rowStyles  }: ListHeaderProps) => {
  return (
    <Row style={rowStyles}>
      {headings.map((heading, index) => (
        <Column colStyles={colStyles} key={index}>
          <AppThemedText style={textStyles} type="defaultSemiBold">
            {heading}
          </AppThemedText>
        </Column>
      ))}
    </Row>
  );
};


export default ListHeader;
