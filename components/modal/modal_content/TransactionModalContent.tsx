import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import {
  addOrUpdateTransaction,
  deleteTransaction,
} from "@/app/(tabs)/apis/api";
import {
  isValidAmount,
  isValidDate,
  isValidDescription,
  validateFormInputs,
} from "@/app/(tabs)/utilities/balance-utilities";
import { TransactionModalContentProps } from "@/app/types";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import ShowIf from "@/components/ShowIf";
import { View } from "react-native";
import Toast from "react-native-toast-message";

const TransactionModalContent = ({
  amount,
  data,
  date,
  description,
  selectedTab,
  setAmount,
  transactionId,
  setDate,
  setDescription,
  setIsVisible,
  setTransactionId,
  refetch,
}: TransactionModalContentProps) => {
  const queryClient = useQueryClient();

  const handleResetState = () => {
    setIsVisible(false),
      setAmount(""),
      setDate(""),
      setDescription(""),
      setTransactionId(""),
      refetch();
  };
  const handleSubmit = () => {
    if (validateFormInputs(amount, date, description)) {
      mutation.mutate();
      handleResetState();
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid form data.",
        text2: "Please try again.",
      });
    }
  };

  const handleDelete = () => {
    deleteTransaction(selectedTab, transactionId);
    handleResetState();
    refetch();
  };

  const mutation = useMutation({
    mutationFn: () =>
      addOrUpdateTransaction(
        amount,
        data,
        date,
        description,
        selectedTab,
        transactionId,
        setAmount,
        setDate,
        setDescription,
        setTransactionId
      ),
    onSuccess: async () => {
      setIsVisible(false);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error: unknown) => {
      if (typeof error === "string") {
        Toast.show({
          type: "error",
          text1: "Error saving transaction.",
          text2: error,
        });
        console.error(
          "Error saving transaction: " + error ?? "Unknown error occurred"
        );
      } else if (error instanceof Error) {
        Toast.show({
          type: "error",
          text1: "Error saving transaction.",
          text2: error.message,
        });
        const errorMessage =
          "Error updating transactions: " +
          (error.message ?? "Unknown error occurred");
        console.error(errorMessage + " " + error.stack);
        handleResetState();
      }
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
            <AppThemedText type="link" onPress={() => handleDelete()}>
              Delete
            </AppThemedText>
          </View>
        }
        renderElse={<View style={{ marginVertical: 25 }}></View>}
      />
      <AppThemedTextInput
        checkValue={isValidDate}
        iconName="calendar"
        placeholder="MM/DD/YYYY"
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
      <AppThemedTouchableOpacity onPress={() => handleSubmit()}>
        Submit
      </AppThemedTouchableOpacity>
      <AppThemedText type="link" onPress={handleResetState}>
        Close
      </AppThemedText>
    </>
  );
};

export default TransactionModalContent;
