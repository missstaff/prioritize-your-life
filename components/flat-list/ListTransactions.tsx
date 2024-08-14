import { FlatList, Pressable } from "react-native";
import Row from "../grid/Row";
import Column from "../grid/Column";
import { AppThemedText } from "../app_components/AppThemedText";
import {
  formatDate,
  truncateString,
} from "@/app/(tabs)/utilities/transactions-utilities";
import { s } from "react-native-size-matters";
import { TransactionProps } from "@/app/types";

export interface ListTransactionsProps {
  data: TransactionProps[] | undefined;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setTransactionId: React.Dispatch<React.SetStateAction<string>>;
}
export default function ListTransactions({
  data,
  setIsVisible,
  setAmount,
  setDate,
  setDescription,
  setTransactionId,
}: ListTransactionsProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => [
            setIsVisible(true),
            setAmount(item.amount),
            setDate(formatDate(item.date)),
            setDescription(item.description),
            setTransactionId(item.id),
          ]}
        >
          <Row>
            <Column>
              <AppThemedText style={[{ fontSize: s(12) }]}>
                {formatDate(item.date)}
              </AppThemedText>
            </Column>
            <Column>
              <AppThemedText style={[{ fontSize: s(12) }]}>
                {parseFloat(item.amount).toFixed(2)}{" "}
              </AppThemedText>
            </Column>
            <Column>
              <AppThemedText style={{ fontSize: s(12) }}>
                {truncateString(item.description, 12)}
              </AppThemedText>
            </Column>
          </Row>
        </Pressable>
      )}
    />
  );
}
