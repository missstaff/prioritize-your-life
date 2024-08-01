import {
  isValidAmount,
  isValidDate,
  isValidDescription,
} from "@/app/(tabs)/utilities/balance-utilities";
import { TransactionModalContentProps } from "@/app/types";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";



const AddTransactionModalContent = ({
  amount,
  date,
  description,
  setAmount,
  setDate,
  setDescription,
  mutation,
  setModalVisible,
}: TransactionModalContentProps) => {
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
      <AppThemedText type="link" onPress={() => setModalVisible(false)}>
        Close
      </AppThemedText>
    </>
  );
};

export default AddTransactionModalContent;