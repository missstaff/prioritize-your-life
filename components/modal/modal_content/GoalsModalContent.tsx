import { addOrUpdateGoal } from "@/app/(tabs)/apis/goal-apis";
import {
  formatDate,
  isValidAmount,
  isValidDate,
  isValidDescription,
} from "@/app/(tabs)/utilities/transactions-utilities";
import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import AppThemedView from "@/components/app_components/AppThemedView";
import ShowIf from "@/components/ShowIf";
import { GoalContext } from "@/store/goals/goal-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

const GoalsModalContent = ({ 
  selectedTab,
  setIsVisible }: 
  { 
    selectedTab: string,
    setIsVisible: (isVisible: boolean) => void}
) => {
  const goalsContext = useContext(GoalContext);
  const {
    description,
    expectedEndDate,
    goal,
    name,
    startingBalance,
    transactions,
    setDescription,
    setExpectedEndDate,
    setGoal,
    setName,
    setStartingBalance,
  } = goalsContext;

  const queryClient = useQueryClient();

  const handleResetState = () => {
    setIsVisible(false);
    setDescription("");
    setExpectedEndDate("");
    setGoal("");
    setName("");
    setStartingBalance("");

  };

  const handleSubmit = () => {
    // if (validateFormInputs(date, amount, description)) {
      mutation.mutate();
      handleResetState();
    // }
  };

  const handleDelete = () => {
    // deleteTransaction(selectedTab, goalId);
    handleResetState();
    // refetch();
  };

  const mutation = useMutation({
    mutationFn: () => addOrUpdateGoal(
    
      // goalId,
    // description,
    // expectedEndDate,
    // goal,
    // name,
    // startDate,
    // startingBalance,
    // transactions,
    // setDescription,
    // setExpectedEndDate,
    // setGoal,
    // setName,
    // setStartingBalance,
    // setStartDate,
    // setTransactions
    goalsContext,
    selectedTab
      ),
    onSuccess: async () => {
      setIsVisible(false);
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: () => {
      handleResetState();
    },
  });

  return (
    <>
      <ShowIf
        condition={true} //transactionId.length > 0
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
            <AppThemedText
              type="link"
              onPress={() => {
                /*transactionId.length > 0*/
              }}
            >
              Delete
            </AppThemedText>
          </AppThemedView>
        }
        renderElse={
          <AppThemedView style={{ marginVertical: 25 }}></AppThemedView>
        }
      />
      <AppThemedTextInput
        data={transactions}
        keyboardType="default"
        placeholder="Goal Name"
        secureEntry={false}
        value={name}
        checkValue={() => {}}
        setValue={setName}
      />
      <AppThemedTextInput
        data={[]}
        keyboardType="default"
        placeholder="Description"
        secureEntry={false}
        value={description}
        checkValue={isValidDescription}
        setValue={setDescription}
      />
      <AppThemedTextInput
        data={[]}
        keyboardType="numeric"
        placeholder="Goal Amount"
        secureEntry={false}
        value={goal}
        checkValue={isValidAmount}
        setValue={setGoal}
      />
      <AppThemedTextInput
        data={[]}
        keyboardType="numeric"
        placeholder="Starting Balance"
        secureEntry={false}
        value={startingBalance}
        checkValue={isValidAmount}
        setValue={setStartingBalance}
      />
      <AppThemedTextInput
        iconName="calendar"
        data={[]}
        keyboardType="numeric"
        placeholder="End Date"
        secureEntry={false}
        value={expectedEndDate}
        checkValue={isValidDate}
        setValue={setExpectedEndDate}
      />

      <AppThemedTouchableOpacity onPress={() => handleSubmit()}>
        Submit
      </AppThemedTouchableOpacity>
      <AppThemedText type="link" onPress={() => handleResetState()}>
        Close
      </AppThemedText>
    </>
  );
};
export { GoalsModalContent };
