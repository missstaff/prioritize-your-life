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
  formatDate,
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
  const {
    amount,
    date,
    description,
    setAmount,
    setDate,
    setDescription,
    setTransactionId,
    id: transactionId,
  } = transactionsCtx;

  const handleResetState = () => {
    setIsVisible(false),
      setAmount(""),
      setDate(""),
      setDescription(""),
      setTransactionId("");
  };

  const handleSubmit = () => {
    if (validateFormInputs(date, amount, description)) {
      mutation.mutate();
      handleResetState();
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
    onError: () => {
      handleResetState();
    },
  });

  return (
    <>
      <ShowIf
        condition={transactionId.length > 0}
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
        value={typeof date === "object" ? formatDate(date) : date}
        checkValue={isValidDate}
        setValue={setDate}
      />
      <AppThemedTextInput
        data={data}
        keyboardType="numeric"
        placeholder="Amount"
        secureEntry={false}
        value={amount}
        checkValue={isValidAmount}
        setValue={setAmount}
      />
      <AppThemedTextInput
        data={data}
        keyboardType="default"
        placeholder="Description"
        secureEntry={false}
        value={description}
        checkValue={isValidDescription}
        setValue={setDescription}
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
