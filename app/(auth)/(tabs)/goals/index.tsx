import React, { useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
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
import { GoalContext, GoalContextType } from "@/store/goal/goal-context";
import { fetchGoals } from "../apis/goal-apis";
import { GoalProps } from "../../../types";
import { COLORS } from "@/constants/Colors";
import { s, ScaledSheet, vs } from "react-native-size-matters";
import { ScrollView, useColorScheme, Text, View } from "react-native";
import Row from "@/components/grid/Row";
import Column from "@/components/grid/Column";
import Balance from "@/components/Balance";
import AppThemedSafeAreaView from "@/components/app_components/AppThemedSafeAreaView";
import { ProgressBar } from "@react-native-community/progress-bar-android";
import BarPairWithLine from "@/components/charts/BarPairWithLine";
import { GoalState } from "@/store/goal/goal-reducer";

const Goals = () => {
  const colorScheme = useColorScheme();
  const goalCtx = useContext<GoalContextType>(GoalContext);
  const [isVisible, setIsVisible] = useState(false);

  const { refetch, isPending, isError, data, error, isFetching, isLoading } =
    useQuery<GoalState[]>({
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

  const balancesTotal = data.reduce(
    (acc, transaction) => acc + transaction.currentBalance,
    0
  );

  const goalsTotal = data.reduce(
    (acc, transaction) => acc + transaction.goal,
    0
  );

  const goalCompleteCount = data.filter((goal) => goal.complete).length;

  return (
    <AppThemedSafeAreaView>
      <ScrollView horizontal={false}>
        <ShowIf
          condition={!isVisible}
          render={
            <View style={{ marginBottom: 25 }}>
              <AppThemedText
                style={{
                  textAlign: "center",
                  paddingTop: 10,
                  paddingBottom: 2.5,
                }}
                type="title"
              >
                Goals
              </AppThemedText>
              <Balance
                balance={balancesTotal}
                data={data}
                setIsVisible={setIsVisible}
                type="Goal"
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
                    At a Glance
                  </AppThemedText>
                  <Row style={{ marginBottom: 15, width: "100%" }}>
                    <Column>
                      <AppThemedText style={styles.text} type="defaultSemiBold">
                        Goals
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
                        Current
                      </AppThemedText>
                      <AppThemedText
                        style={[styles.text, { fontSize: 16 }]}
                        type="default"
                      >
                        {`$${balancesTotal.toFixed(2)}`}
                      </AppThemedText>
                    </Column>

                    <Column>
                      <View>
                        <AppThemedText
                          style={styles.text}
                          type="defaultSemiBold"
                        >
                          Progress
                        </AppThemedText>
                        <AppThemedText style={[styles.text, { fontSize: 16 }]}>
                          {balancesTotal > 0
                            ? `${((balancesTotal / goalsTotal) * 100).toFixed(
                                0
                              )}%`
                            : `${0}%`}
                        </AppThemedText>
                        <ProgressBar
                          styleAttr="Horizontal"
                          indeterminate={false}
                          color={COLORS.primary}
                          progress={
                            goalsTotal > 0
                              ? parseFloat(
                                  (balancesTotal / goalsTotal).toFixed(2)
                                )
                              : 0
                          }
                        />
                      </View>
                    </Column>
                  </Row>

                  <Row style={{ width: "100%" }}>
                    <Column>
                      <AppThemedText style={styles.text} type="defaultSemiBold">
                        Count
                      </AppThemedText>
                      <AppThemedText
                        style={[styles.text, { fontSize: 16 }]}
                        type="default"
                      >
                        {data.length}
                      </AppThemedText>
                    </Column>

                    <Column>
                      <AppThemedText style={styles.text} type="defaultSemiBold">
                        Complete
                      </AppThemedText>
                      <AppThemedText
                        style={[styles.text, { fontSize: 16 }]}
                        type="default"
                      >
                        {goalCompleteCount}
                      </AppThemedText>
                    </Column>

                    <Column>
                      <View>
                        <AppThemedText
                          style={styles.text}
                          type="defaultSemiBold"
                        >
                          Success
                        </AppThemedText>
                        <AppThemedText style={[styles.text, { fontSize: 16 }]}>
                          {data.length > 0
                            ? ((goalCompleteCount / data.length) * 100).toFixed(
                                0
                              )
                            : 0}
                          %
                        </AppThemedText>
                        {data.length > 0 && (
                          <ProgressBar
                            styleAttr="Horizontal"
                            indeterminate={false}
                            color={COLORS.primary}
                            progress={(goalCompleteCount / data.length) * 100}
                          />
                        )}
                      </View>
                    </Column>
                  </Row>
                </View>
              </View>

              <BarPairWithLine />

              <AppThemedText style={styles.sectionTitle} type="subtitle">
                Goal List
              </AppThemedText>

              <ShowIf
                condition={data?.length > 0}
                render={
                  <ListWrapper style={{marginLeft: 50, marginRight: 50}}>
                    <ListHeader
                    rowStyles={{ justifyContent: "space-between"}}
                      colStyles={{
                        width: "33%",
                      }}
                      headings={["Goal", "Balance", "Progress"]}
                    />
                    <List
                      queryFn={() => fetchGoals()}
                      queryKey={["goals"]}
                      handleOnPress={handleOnPress}
                    />
                  </ListWrapper>
                }
                renderElse={
                  <NoListItems setIsVisible={setIsVisible} type="Goal" />
                }
              />
            </View>
          }
          renderElse={
            <AppModal onClose={handleClose} visible={isVisible}>
              <GoalModalContent setIsVisible={setIsVisible} />
              <Toast />
            </AppModal>
          }
        />
      </ScrollView>
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
