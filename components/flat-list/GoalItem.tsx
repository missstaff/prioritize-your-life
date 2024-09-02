import { s, ScaledSheet } from "react-native-size-matters";
import AppThemedText from "../app_components/AppThemedText";
import Column from "../grid/Column";
import Row from "../grid/Row";
import { truncateString } from "@/app/(auth)/(tabs)/utilities/transactions-utilities";
import { ListItemProps } from "@/app/types";

const GoalItem = ({ item }: ListItemProps) => {
  return (
    <Row>
      <Column>
        <AppThemedText style={styles.text}>
          {truncateString(item.name)}
        </AppThemedText>
      </Column>
      <Column>
        <AppThemedText style={styles.text}>
          ${item.currentBalance?.toFixed(2)}
        </AppThemedText>
      </Column>
      <Column>
        <AppThemedText style={styles.text}>
          {item.progress?.toFixed(0)}%
        </AppThemedText>
      </Column>
    </Row>
  );
};

const styles = ScaledSheet.create({
  text: {
    fontSize: s(12),
  },
});

export default GoalItem;
