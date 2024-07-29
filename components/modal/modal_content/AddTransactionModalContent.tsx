import {
  isValidAmount,
  isValidDate,
  isValidDescription,
} from "@/app/(tabs)/utilities/balance-utilities";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { UseMutationResult } from "@tanstack/react-query";

interface AddTransactionModalContentProps {
  amount: string;
  date: string;
  description: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  mutation: UseMutationResult<void, Error, void, unknown>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTransactionModalContent = ({
  amount,
  date,
  description,
  setAmount,
  setDate,
  setDescription,
  mutation,
  setModalVisible,
}: AddTransactionModalContentProps) => {
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
        Add
      </AppThemedText>
      <AppThemedText type="link" onPress={() => setModalVisible(false)}>
        Close
      </AppThemedText>
    </>
  );
};

export default AddTransactionModalContent;