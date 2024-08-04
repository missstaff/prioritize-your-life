import { addOrUpdateTransaction } from "@/app/(tabs)/apis/api";
import {
  isValidAmount,
  isValidDate,
  isValidDescription,
} from "@/app/(tabs)/utilities/balance-utilities";
import { TransactionModalContentProps } from "@/app/types";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import Toast from "react-native-toast-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
        "Error adding transaction: " +
        (error instanceof Error ? error.message : "Unknown error occurred.");
      Toast.show({
        type: "error",
        text1: "Error adding transaction.",
        text2: errorMessage,
      });
    },
  });
  return (
    <>
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
      <AppThemedText type="link" onPress={() => mutation.mutate()}>
        Submiit
      </AppThemedText>
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
