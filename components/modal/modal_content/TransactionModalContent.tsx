import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import ShowIf from "@/components/ShowIf";
import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedView from "@/components/app_components/AppThemedView";
import { TransactionContext } from "@/store/transaction/transaction-context";
import {
  addOrUpdateTransaction,
  deleteTransaction,
} from "@/app/(tabs)/apis/transaction-apis";
import {
  isValidAmount,
  isValidDate,
  isValidDescription,
  validateFormInputs,
} from "@/app/(tabs)/utilities/transactions-utilities";
import { TransactionModalContentProps } from "@/app/types";

/**
 * @param {TransactionModalContentProps} props - The props for the TransactionModalContent component.
 * @param {string} props.data - The data for the transaction.
 * @param {number} props.selectedTab - The index of the currently selected tab.
 * @param {Function} props.setIsVisible - A function to set the visibility of the modal.
 * @param {Function} props.refetch - A function to refetch the transactions.
 * @returns {JSX.Element} The rendered TransactionModalContent component.
 */
const TransactionModalContent = ({
  data,
  selectedTab,
  setIsVisible,
  refetch,
}: TransactionModalContentProps) => {
  const queryClient = useQueryClient();
  const transactionsCtx = useContext(TransactionContext);

  const handleResetState = () => {
    setIsVisible(false);
    transactionsCtx.setAmount("");
    transactionsCtx.setDate("");
    transactionsCtx.setDescription("");
    transactionsCtx.setTransactionId("");
  };

  const handleSubmit = () => {
    if (validateFormInputs(
      transactionsCtx.date, 
      transactionsCtx.amount, 
      transactionsCtx.description)
    ) {
      mutation.mutate();
      handleResetState();
    }
  };

  const handleDelete = () => {
    deleteTransaction(selectedTab, transactionsCtx.id);
    handleResetState();
    refetch();
  };

  const mutation = useMutation({
    mutationFn: () =>
      addOrUpdateTransaction(data, selectedTab, transactionsCtx),
    onSuccess: async () => {
      setIsVisible(false);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      handleResetState();
    },
  });

  return (
    <>
      <ShowIf
        condition={transactionsCtx.id.length > 0}
        render={
          <AppThemedView
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
          </AppThemedView>
        }
        renderElse={
          <AppThemedView style={{ marginVertical: 25 }}></AppThemedView>
        }
      />
      <AppThemedTextInput
        iconName="calendar"
        data={data}
        keyboardType="numeric"
        placeholder="MM/DD/YYYY"
        secureEntry={false}
        value={transactionsCtx.date}
        checkValue={isValidDate}
        setValue={transactionsCtx.setDate}
      />
      <AppThemedTextInput
        data={data}
        keyboardType="numeric"
        placeholder="Amount"
        secureEntry={false}
        value={transactionsCtx.amount.toString()}
        checkValue={isValidAmount}
        setValue={transactionsCtx.setAmount}
      />
      <AppThemedTextInput
        data={data}
        keyboardType="default"
        placeholder="Description"
        secureEntry={false}
        value={transactionsCtx.description}
        checkValue={isValidDescription}
        setValue={transactionsCtx.setDescription}
      />
      <AppThemedTouchableOpacity onPress={handleSubmit}>
        Submit
      </AppThemedTouchableOpacity>
      <AppThemedText type="link" onPress={handleResetState}>
        Close
      </AppThemedText>
    </>
  );
};

export default TransactionModalContent;
