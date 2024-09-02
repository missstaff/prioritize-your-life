import React, { useContext, useEffect, useState } from "react";
import { ProgressBarAndroid } from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import AppThemedText from "@/components/app_components/AppThemedText";
import AppModal from "@/components/modal/Modal";
import GoalModalContent from "@/components/modal/modal_content/GoalModalContent";
import LoadingSpinner from "@/components/LoadingSpinner";
import List from "@/components/flat-list/List";
import ListHeader from "@/components/flat-list/ListHeader";
import ListWrapper from "@/components/flat-list/ListWrapper";
import NoListItems from "@/components/flat-list/item/NoListItems";
import OnError from "@/components/OnError";
import ShowIf from "@/components/ShowIf";
import { GoalContext, GoalContextType } from "@/store/goals/goal-context";
import { fetchGoals } from "../apis/goal-apis";
import { GoalProps } from "../../../types";
import { COLORS } from "@/constants/Colors";
import { s, ScaledSheet, vs } from "react-native-size-matters";
import { useColorScheme, View } from "react-native";
import Row from "@/components/grid/Row";
import Column from "@/components/grid/Column";
import Balance from "@/components/Balance";
import AppThemedSafeAreaView from "@/components/app_components/AppThemedSafeAreaView";

const Goals = () => {
  const colorScheme = useColorScheme();
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

  let balancesTotal = data.reduce(
    (acc, transaction) => acc + transaction.currentBalance,
    0
  );

  let goalsTotal = data.reduce((acc, transaction) => acc + transaction.goal, 0);

  return (
    <AppThemedSafeAreaView>
      <AppThemedText
        style={{ textAlign: "center", paddingTop: 10, paddingBottom: 2.5 }}
        type="title"
      >
        Goals
      </AppThemedText>
      <Balance
        balance={balancesTotal}
        data={data}
        setIsVisible={setIsVisible}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.section}>
          <AppThemedText style={styles.sectionTitle} type="subtitle">
            Progress
          </AppThemedText>
          <Row style={{ marginBottom: 15, width: "100%" }}>
            <Column>
              <AppThemedText style={styles.text} type="defaultSemiBold">
                All Goals
              </AppThemedText>
              <AppThemedText
                style={[styles.text, { fontSize: 16 }]}
                type="default"
              >
                {`$${goalsTotal.toFixed(2)}`}
              </AppThemedText>
            </Column>

            <Column>
              <AppThemedText style={styles.text} type="defaultSemiBold">
                Saved
              </AppThemedText>
              <AppThemedText
                style={[styles.text, { fontSize: 16 }]}
                type="default"
              >
                {`$${balancesTotal.toFixed(2)}`}
              </AppThemedText>
            </Column>

            <Column>
              <AppThemedText style={styles.text} type="defaultSemiBold">
                Progress
              </AppThemedText>
              <AppThemedText style={[styles.text, { fontSize: 16 }]}>
                {`${((balancesTotal / goalsTotal) * 100).toFixed(0)}%`}
              </AppThemedText>
            </Column>
          </Row>

          <View>
            <AppThemedText type="default" style={styles.text}>
              {`${((balancesTotal / goalsTotal) * 100).toFixed(0)}%`} of total
            </AppThemedText>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              color={COLORS.primary}
              progress={balancesTotal / goalsTotal}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.section}>
          <AppThemedText style={styles.sectionTitle} type="subtitle">
            Progress
          </AppThemedText>
          <Row style={{ marginBottom: 15, width: "100%" }}>
            <Column>
              <AppThemedText style={styles.text} type="defaultSemiBold">
                All Goals
              </AppThemedText>
              <AppThemedText
                style={[styles.text, { fontSize: 16 }]}
                type="default"
              >
                {`$${goalsTotal.toFixed(2)}`}
              </AppThemedText>
            </Column>

            <Column>
              <AppThemedText style={styles.text} type="defaultSemiBold">
                Saved
              </AppThemedText>
              <AppThemedText
                style={[styles.text, { fontSize: 16 }]}
                type="default"
              >
                {`$${balancesTotal.toFixed(2)}`}
              </AppThemedText>
            </Column>

            <Column>
              <AppThemedText style={styles.text} type="defaultSemiBold">
                Progress
              </AppThemedText>
              <AppThemedText style={[styles.text, { fontSize: 16 }]}>
                {`${((balancesTotal / goalsTotal) * 100).toFixed(0)}%`}
              </AppThemedText>
            </Column>
          </Row>

          <View>
            <AppThemedText type="default" style={styles.text}>
              {`${((balancesTotal / goalsTotal) * 100).toFixed(0)}%`} of total
            </AppThemedText>
            <ProgressBarAndroid
              styleAttr="Horizontal"
              indeterminate={false}
              color={COLORS.primary}
              progress={balancesTotal / goalsTotal}
            />
          </View>
        </View>
      </View>

      <ShowIf
        condition={data?.length > 0}
        render={
          <ListWrapper>
            <AppThemedText style={styles.sectionTitle} type="subtitle">
              Goal List
            </AppThemedText>
            <ListHeader headings={["Goal", "Balance", "Progress"]} />
            <List
              queryFn={() => fetchGoals()}
              queryKey={["goals"]}
              handleOnPress={handleOnPress}
            />
          </ListWrapper>
        }
        renderElse={<NoListItems setIsVisible={setIsVisible} type="Goal" />}
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
      <StatusBar style="auto" />
    </AppThemedSafeAreaView>
  );
};

export default Goals;

const styles = ScaledSheet.create({
  section: {
    width: "100%",
    padding: s(20),
  },
  sectionTitle: {
    // fontSize: s(18),
    // fontWeight: "bold",
    marginBottom: vs(10),
    textAlign: "center",
  },
  text: {
    // fontSize: s(16),
    // textAlign: "center",
    textAlign: "left",
  },
});
