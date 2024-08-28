import { TransactionState } from "@/store/transaction/transaction-reducer";
import AppThemedText from "../app_components/AppThemedText";

export interface AddTransactionProps {
  balance: number | undefined;
  data: TransactionState[] | undefined;
  setIsVisible: (isVisible: boolean) => void;
}

/**
 * Represents the balance component.
 * @param {AddTransactionProps} props - The props for the balance component.
 * @param {number | undefined} props.balance - The balance to be displayed.
 * @param {TransactionState[] | undefined} props.data - The transaction data.
 * @param {function} props.setIsVisible - The function to set the visibility of the component.
 * @returns {JSX.Element} The rendered balance component.
 */
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
