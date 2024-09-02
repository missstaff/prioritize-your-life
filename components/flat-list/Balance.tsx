import { TransactionState } from "@/store/transaction/transaction-reducer";
import AppThemedText from "../app_components/AppThemedText";
import ShowIf from "../ShowIf";
import AppThemedView from "../app_components/AppThemedView";

export interface AddTransactionProps {
  balance: number | undefined;
  data: TransactionState[] | undefined;
  setIsVisible: (isVisible: boolean) => void;
}

const Balance = ({ balance, data, setIsVisible }: AddTransactionProps) => {
  return (
    <>
      <AppThemedText>
        {!data?.length ? "$0.00" : "$" + balance?.toFixed(2)}
      </AppThemedText>
      <ShowIf
        condition={data && data?.length > 0}
        render={
          <AppThemedText type="link" onPress={() => [setIsVisible(true)]}>
            Add Transaction
          </AppThemedText>
        }
        renderElse={<AppThemedView></AppThemedView>}
      />
    </>
  );
};

export default Balance;
