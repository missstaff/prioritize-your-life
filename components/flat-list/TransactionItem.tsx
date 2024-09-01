import { truncateString } from "@/app/(auth)/(tabs)/utilities/transactions-utilities";
import AppThemedText from "../app_components/AppThemedText";
import Column from "../grid/Column";
import Row from "../grid/Row";
import ShowIf from "../ShowIf";
import { s, ScaledSheet } from "react-native-size-matters";
import { ListItemProps } from "@/app/types";

export default function TransactionItem({ item }: ListItemProps) {
  return (
    <Row>
      <Column>
        <AppThemedText style={styles.text}>{item.date}</AppThemedText>
      </Column>
      <Column>
        <AppThemedText style={styles.text}>{item.amount}</AppThemedText>
      </Column>
      <Column>
        <ShowIf
          condition={item.progress !== undefined}
          render={
            <AppThemedText style={styles.text}>{item.progress}%</AppThemedText>
          }
        />
        <AppThemedText style={styles.text}>
          {truncateString(item.description)}
        </AppThemedText>
      </Column>
    </Row>
  );
}

const styles = ScaledSheet.create({
  text: {
    fontSize: s(12),
  },
});
