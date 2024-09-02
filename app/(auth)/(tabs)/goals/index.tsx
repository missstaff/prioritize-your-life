import React, { useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedView from "@/components/app_components/AppThemedView";
import AppModal from "@/components/modal/Modal";
import Balance from "@/components/Balance";
import GoalModalContent from "@/components/modal/modal_content/GoalModalContent";
import LoadingSpinner from "@/components/LoadingSpinner";
import List from "@/components/flat-list/List";
import ListHeader from "@/components/flat-list/ListHeader";
import ListWrapper from "@/components/flat-list/ListWrapper";
import NoListItems from "@/components/flat-list/item/NoListItems";
import OnError from "@/components/OnError";
import ShowIf from "@/components/ShowIf";
import { GoalContext, GoalContextType } from "@/store/goals/goal-context";
import { fetchGoalById, fetchGoals } from "../apis/goal-apis";
import { GoalProps } from "../../../types";

const Goals = () => {
  const { id } = useLocalSearchParams();
  const goalCtx = useContext<GoalContextType>(GoalContext);
  const [isVisible, setIsVisible] = useState(false);

  const { refetch, isPending, isError, data, error, isFetching, isLoading } =
    useQuery<GoalProps[]>({
      queryKey: ["goals"],
      queryFn: () => fetchGoals(),
      refetchOnMount: true,
    });

  const handleClose = () => {
    setIsVisible(false);
    goalCtx.setDescription("");
    goalCtx.setExpectedEndDate("");
    goalCtx.setGoal("");
    goalCtx.setName("");
    goalCtx.setStartingBalance("");
    refetch();
  };

  const handleOnPress = async (item: GoalProps) => {
    router.push(`../../goals/details/[${item.id}]`);
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isPending || isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <OnError error={error} />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppThemedView
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <AppThemedText
          style={{ textAlign: "center"}}
          type="title"
        >
          Goals
        </AppThemedText>

        <Balance balance={0.0} data={[]} setIsVisible={setIsVisible} />

        <ShowIf
          condition={data && data.length > 0}
          render={
            <ListWrapper>
              <ListHeader headings={["Name", "Balance", "Progress"]} />
              <List
                queryFn={() => fetchGoals()}
                queryKey={["goals"]}
                handleOnPress={handleOnPress}
              />
            </ListWrapper>
          }
          renderElse={
           <NoListItems setIsVisible={setIsVisible} type="Goal"/>
          }
        />

        <ShowIf
          condition={isVisible}
          render={
            <AppModal onClose={handleClose} visible={isVisible}>
              <GoalModalContent setIsVisible={setIsVisible} />
              <Toast />
            </AppModal>
          }
        />
      </AppThemedView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Goals;
