import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import { addOrUpdateTransaction } from "@/app/(tabs)/apis/api";
import {
  isValidAmount,
  isValidDate,
  isValidDescription,
} from "@/app/(tabs)/utilities/balance-utilities";
import { TransactionModalContentProps } from "@/app/types";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import ShowIf from "@/components/ShowIf";
import { View } from "react-native";

const TransactionModalContent = ({
  amount,
  date,
  description,
  setAmount,
  setDate,
  setDescription,
  setModalVisible,
  setTransactionId,
  transactionId,
}: TransactionModalContentProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () =>
      addOrUpdateTransaction(
        amount,
        date,
        description,
        transactionId,
        setAmount,
        setDate,
        setDescription,
        setTransactionId
      ),
    onSuccess: async () => {
      setModalVisible(false);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      const errorMessage =
        "Error adding or updating transaction(s): " +
        (error instanceof Error ? error.message : error);
      console.error(errorMessage + " " + error.stack);
      setAmount("");
      setDate("");
      setDescription("");
      setTransactionId("");
      setModalVisible(false);
    },
  });
  return (
    <>
      <ShowIf
        condition={transactionId.length > 0} 
        render={
          <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            paddingBottom: 25,
            width: "80%",
            justifyContent: "flex-end",
          }}
          >
            <AppThemedText
            type="link"
            onPress={() => [
              setModalVisible(false),
              setAmount(""),
              setDate(""),
              setDescription(""),
              setTransactionId(""),
            ]}
            onPressIn={() => {() => console}}
          >
            Delete
          </AppThemedText>
          </View>
        }
        renderElse={
          <View style={{marginVertical: 25}}></View>
        }
      />
      <AppThemedTextInput
        checkValue={isValidDate}
        iconName="calendar"
        placeholder="MM/DD/YY"
        secureEntry={false}
        setValue={setDate}
        value={date}
      />
      <AppThemedTextInput
        checkValue={isValidAmount}
        placeholder="Amount"
        secureEntry={false}
        setValue={setAmount}
        value={amount}
      />
      <AppThemedTextInput
        checkValue={isValidDescription}
        placeholder="Description"
        secureEntry={false}
        setValue={setDescription}
        value={description}
      />
      <AppThemedTouchableOpacity onPress={() => mutation.mutate()}>
        Submit
      </AppThemedTouchableOpacity>
      <AppThemedText
        type="link"
        onPress={() => [
          setModalVisible(false),
          setAmount(""),
          setDate(""),
          setDescription(""),
          setTransactionId(""),
        ]}
      >
        Close
      </AppThemedText>
    </>
  );
};

export default TransactionModalContent;
