import { TransactionState } from "@/store/transaction/transaction-reducer";
import AppThemedText from "./app_components/AppThemedText";
import ShowIf from "./ShowIf";
import AppThemedView from "./app_components/AppThemedView";
import { ScaledSheet } from "react-native-size-matters";

export interface AddTransactionProps {
  balance: number | undefined;
  data: TransactionState[] | undefined;
  setIsVisible: (isVisible: boolean) => void;
}

const Balance = ({ balance, data, setIsVisible }: AddTransactionProps) => {
  return (
    <AppThemedView style={styles.container}>
      <ShowIf
        condition={data && data?.length > 0}
        render={
          <AppThemedText type="default">
            {`$${balance?.toFixed(2)}`}
          </AppThemedText>
        }
        renderElse={<AppThemedView></AppThemedView>}
      />
      <ShowIf
        condition={data && data?.length > 0}
        render={
          <AppThemedText type="link" onPress={() => [setIsVisible(true)]}>
            Add Transaction
          </AppThemedText>
        }
        renderElse={<AppThemedView></AppThemedView>}
      />
    </AppThemedView>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default Balance;
