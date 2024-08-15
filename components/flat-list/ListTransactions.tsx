import { FlatList, Pressable } from "react-native";
import Row from "../grid/Row";
import Column from "../grid/Column";
import { AppThemedText } from "../app_components/AppThemedText";
import { formatDate, truncateString } from "@/app/(tabs)/utilities/transactions-utilities";
import { s, ScaledSheet } from "react-native-size-matters";
import { TransactionState } from "@/store/transaction-reducer";
import { useContext } from "react";
import { TransactionContext } from "@/store/transaction-context";


export interface ListTransactionsProps {
  data: TransactionState[] | undefined;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ListTransactions({
  data,
  setIsVisible,
}: ListTransactionsProps) {
  const transactionCtx = useContext(TransactionContext);
  const { date, setAmount, setDate, setDescription, setTransactionId } = transactionCtx;
  
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => [
            setIsVisible(true),
            setAmount(item.amount),
            setDate(item.date),
            setDescription(item.description),
            setTransactionId(item.id),
          ]}
        >
          <Row>
            <Column>
              <AppThemedText style={styles.text}>
                {formatDate(item.date)}
              </AppThemedText>
            </Column>
            <Column>
              <AppThemedText style={styles.text}>
                {parseFloat(item.amount).toFixed(2)}{" "}
              </AppThemedText>
            </Column>
            <Column>
              <AppThemedText style={styles.text}>
                {truncateString(item.description, 12)}
              </AppThemedText>
            </Column>
          </Row>
        </Pressable>
      )}
    />
  );
}

const styles = ScaledSheet.create({
    text: {
        fontSize: s(12),
    }
});
