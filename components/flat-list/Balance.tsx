import { TransactionState } from "@/store/transaction/transaction-reducer";
import { AppThemedText } from "../app_components/AppThemedText";

export interface AddTransactionProps {
  balance: number | undefined;
  data: TransactionState[] | undefined;
  setIsVisible: (isVisible: boolean) => void;
}

export default function Balance({
  balance,
  data,
  setIsVisible,
}: AddTransactionProps) {
  return (
    <>
      <AppThemedText>
        {!data?.length ? "$0.00" : "$" + balance?.toFixed(2)}
      </AppThemedText>
      <AppThemedText type="link" onPress={() => [setIsVisible(true)]}>
        Add Transaction
      </AppThemedText>
    </>
  );
}
