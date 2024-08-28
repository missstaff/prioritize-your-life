import { useContext } from "react";
import { FlatList, Pressable } from "react-native";
import { ScaledSheet, s } from "react-native-size-matters";
import AppThemedText from "../app_components/AppThemedText";
import Column from "../grid/Column";
import Row from "../grid/Row";
import { TransactionState } from "@/store/transaction/transaction-reducer";
import { TransactionContext } from "@/store/transaction/transaction-context";
import {
  formatDate,
  truncateString,
} from "@/app/(tabs)/utilities/transactions-utilities";

export interface ListTransactionsProps {
  data: TransactionState[] | undefined;
  setIsVisible: (isVisible: boolean) => void;
}
/**
 * Renders a list of transactions.
 *
 * @component
 * @param {ListTransactionsProps} props - The component props.
 * @param {Array<Transaction>} props.data - The array of transactions to render.
 * @param {Function} props.setIsVisible - The function to set the visibility of the transaction details.
 * @returns {JSX.Element} The rendered list of transactions.
 */
export default function ListTransactions({
  data,
  setIsVisible,
}: ListTransactionsProps) {
  const transactionCtx = useContext(TransactionContext);
  const { date, setAmount, setDate, setDescription, setTransactionId } =
    transactionCtx;

  return (
    <FlatList
      scrollEnabled={true}
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
                {item.description.length <= 15 ? item.description : truncateString(item.description, 12)}
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
  },
});
