import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import AppThemedView from "@/components/app_components/AppThemedView";
import AppModal from "@/components/modal/Modal";
import { GoalsModalContent } from "@/components/modal/modal_content/GoalsModalContent";
import ShowIf from "@/components/ShowIf";
import TabbedComponent from "@/components/TabbedComponent";
import { AppContext } from "@/store/app/app-context";
import { GoalContext, GoalContextType } from "@/store/goals/goal-context";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { s, ScaledSheet, vs } from "react-native-size-matters";
import Toast from "react-native-toast-message";
import { fetchGoalById, fetchGoals } from "../apis/goal-apis";
import LoadingSpinner from "@/components/LoadingSpinner";
import OnError from "@/components/navigation/OnError";
import { GoalProps } from "../../../types";
import ListHeader from "@/components/flat-list/ListHeader";
import ListTransactions from "@/components/flat-list/List";
import { COLORS } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";

export default function Goals() {
  const { id } = useLocalSearchParams();
  const appCtx = useContext(AppContext);
  const { selectedTab, setSelectedTab } = appCtx;
  const goalCtx = useContext<GoalContextType>(GoalContext);
  const [isVisible, setIsVisible] = useState(false);
  const tabsArr = ["Long Term", "Short Term"];

  const { refetch, isPending, isError, data, error, isFetching, isLoading } =
    useQuery<GoalProps[]>({
      queryKey: ["goals", "goals" + tabsArr[selectedTab]],
      queryFn: () => fetchGoals(tabsArr[selectedTab]),
      refetchOnMount: true,
    });

  useEffect(() => {
    refetch();
  }, [selectedTab]);

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

  if (isPending || isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <OnError error={error} />;
  }
  return (
    <AppThemedView
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <AppThemedText
        style={{ textAlign: "center", paddingTop: 25 }}
        type="title"
      >
        Goals
      </AppThemedText>

      <TabbedComponent
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={tabsArr}
      >
        {tabsArr.map((tab, index) => (
          <ShowIf
            key={index}
            condition={data && data.length > 0}
            render={
              <AppThemedView style={styles.container}>
                <ListHeader
                  styles={styles.tableHeader}
                  headings={["Name", "Balance", "Progress"]}
                />
                <ListTransactions
                  queryFn={() => fetchGoals(tabsArr[selectedTab])}
                  queryKey={["goals", "goals" + tabsArr[selectedTab]]}
                  handleOnPress={handleOnPress}
                />
              </AppThemedView>
            }
            renderElse={
              <AppThemedView
                style={{
                  height: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AppThemedText style={{ paddingBottom: 10 }} type="default">
                  No Goals Found
                </AppThemedText>
                <AppThemedView>
                  <AppThemedTouchableOpacity onPress={() => setIsVisible(true)}>
                    Add Goal
                  </AppThemedTouchableOpacity>
                </AppThemedView>
              </AppThemedView>
            }
          />
        ))}
      </TabbedComponent>

      <ShowIf
        condition={isVisible}
        render={
          <AppModal onClose={handleClose} visible={isVisible}>
            <GoalsModalContent
              selectedTab={tabsArr[selectedTab]}
              setIsVisible={setIsVisible}
            />

            <Toast />
          </AppModal>
        }
      />
    </AppThemedView>
  );
}
const styles = ScaledSheet.create({
  container: {
    borderRadius: s(10),
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100%",
    maxHeight: "100%",
    marginVertical: vs(5),
    paddingHorizontal: s(25),
    paddingVertical: s(10),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: s(5),
    width: "100%",
  },
  tableHeader: {
    fontWeight: "bold",
  },
});
