import { s, ScaledSheet, vs } from "react-native-size-matters";
import AppThemedText from "../../app_components/AppThemedText";
import Column from "../../grid/Column";
import Row from "../../grid/Row";
import {
  formatTimestamp,
  truncateString,
} from "@/app/(auth)/(tabs)/utilities/transactions-utilities";
import { ListItemProps } from "@/app/types";

const TransactionListItem: React.FC<ListItemProps> = ({ item }) => {
  return (
     <Row style={{paddingVertical: vs(5), justifyContent: "space-between",marginLeft: 40, marginRight: 50}}>
      <Column colStyles={{width: "20%"}}>
        <AppThemedText style={[styles.text]}>
          {formatTimestamp(item.date).slice(0,5)}
        </AppThemedText>
      </Column>
      <Column colStyles={{width: "30%"}}>
        <AppThemedText style={[styles.text]}>
          {Number(item.amount).toFixed(2)}
        </AppThemedText>
      </Column>
      <Column colStyles={{ width: "50%"}}>
        <AppThemedText style={[styles.text]}>
          {truncateString(item.description)}
        </AppThemedText>
      </Column>
    </Row>
  );
};

const styles = ScaledSheet.create({
  text: {
    fontSize: s(12),
    textAlign: "left",
  },
});

export default TransactionListItem;
