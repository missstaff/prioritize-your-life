import { TransactionState } from "@/store/transaction/transaction-reducer";
import AppThemedText from "./app_components/AppThemedText";
import ShowIf from "./ShowIf";
import { ScaledSheet } from "react-native-size-matters";
import { View } from "react-native";

export interface AddTransactionProps {
  balance?: number | undefined;
  data?: any[] | undefined;
  setIsVisible: (isVisible: boolean) => void;
}

const Balance = ({ balance, data, setIsVisible }: AddTransactionProps) => {
  return (
    <View style={styles.container}>
      <ShowIf
        condition={data && data?.length > 0 && balance !== undefined}
        render={
          <AppThemedText type="default">
            {`$${balance?.toFixed(2)}`}
          </AppThemedText>
        }
        renderElse={<View></View>}
      />
      <ShowIf
        condition={data && data?.length > 0}
        render={
          <AppThemedText type="link" onPress={() => [setIsVisible(true)]}>
            Add {data && data[0]?.goal ? "Goal" : "Transaction"}
          </AppThemedText>
        }
        renderElse={<View></View>}
      />
    </View>
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
