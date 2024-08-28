import AppThemedText from "../app_components/AppThemedText";
import Column from "../grid/Column";
import Row from "../grid/Row";

export interface ListHeaderProps {
  headings: string[];
  styles: {};
}

/**
 * Renders the header component for a list.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.styles - The styles for the header component.
 * @param {Array<string>} props.headings - The headings to be displayed in the header.
 * @returns {JSX.Element} The rendered header component.
 */
export default function ListHeader({ styles, headings }: ListHeaderProps) {
  return (
    <Row>
      {headings.map((heading, index) => (
        <Column key={index}>
          <AppThemedText style={styles}>{heading}</AppThemedText>
        </Column>
      ))}
    </Row>
  );
}
