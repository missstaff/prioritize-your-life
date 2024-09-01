import { truncateString } from "@/app/(tabs)/utilities/transactions-utilities";
import AppThemedText from "../app_components/AppThemedText";
import Column from "../grid/Column";
import Row from "../grid/Row";
import { s, ScaledSheet } from "react-native-size-matters";
import { ListItemProps } from "@/app/types";


export default function GoalItem({ item }: ListItemProps) {
  return (
    <Row>
      <Column>
        <AppThemedText style={styles.text}>
          {truncateString(item.name)}
        </AppThemedText>
      </Column>
      <Column>
        <AppThemedText style={styles.text}>{item.currentBalance}</AppThemedText>
      </Column>
      <Column>
        <AppThemedText style={styles.text}>{item.progress}%</AppThemedText>
      </Column>
    </Row>
  );
}

const styles = ScaledSheet.create({
  text: {
    fontSize: s(12),
  },
});
