import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import AppThemedView from "@/components/app_components/AppThemedView";
import ShowIf from "@/components/ShowIf";
import { GoalContext } from "@/store/goals/goal-context";
import { addOrUpdateGoal } from "@/app/(auth)/(tabs)/apis/goal-apis";
import {
  isValidAmount,
  isValidDate,
  isValidDescription,
} from "@/app/(auth)/(tabs)/utilities/transactions-utilities";

const GoalsModalContent = ({
  selectedTab,
  setIsVisible,
}: {
  selectedTab: string;
  setIsVisible: (isVisible: boolean) => void;
}) => {
  const goalsContext = useContext(GoalContext);

  const queryClient = useQueryClient();

  const handleResetState = () => {
    setIsVisible(false);
    goalsContext.setDescription("");
    goalsContext.setExpectedEndDate("");
    goalsContext.setGoal("");
    goalsContext.setName("");
    goalsContext.setStartingBalance("");
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
    mutationFn: () => addOrUpdateGoal(goalsContext, selectedTab),
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
        data={goalsContext.transactions}
        keyboardType="default"
        placeholder="Goal Name"
        secureEntry={false}
        value={goalsContext.name}
        checkValue={() => {}}
        setValue={goalsContext.setName}
      />
      <AppThemedTextInput
        data={[]}
        keyboardType="default"
        placeholder="Description"
        secureEntry={false}
        value={goalsContext.description}
        checkValue={isValidDescription}
        setValue={goalsContext.setDescription}
      />
      <AppThemedTextInput
        data={[]}
        keyboardType="numeric"
        placeholder="Goal Amount"
        secureEntry={false}
        value={goalsContext.goal}
        checkValue={isValidAmount}
        setValue={goalsContext.setGoal}
      />
      <AppThemedTextInput
        data={[]}
        keyboardType="numeric"
        placeholder="Starting Balance"
        secureEntry={false}
        value={goalsContext.startingBalance}
        checkValue={isValidAmount}
        setValue={goalsContext.setStartingBalance}
      />
      <AppThemedTextInput
        iconName="calendar"
        data={[]}
        keyboardType="numeric"
        placeholder="End Date"
        secureEntry={false}
        value={goalsContext.expectedEndDate}
        checkValue={isValidDate}
        setValue={goalsContext.setExpectedEndDate}
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
