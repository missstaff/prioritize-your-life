import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet, s, vs } from "react-native-size-matters";
import { useLocalSearchParams } from "expo-router";
import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedView from "@/components/app_components/AppThemedView";
import { fetchGoalById } from "../../apis/goal-apis";
import { COLORS } from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { GoalProps } from "@/app/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import OnError from "@/components/OnError";
import ShowIf from "@/components/ShowIf";
import ListWrapper from "@/components/flat-list/ListWrapper";
import ListHeader from "@/components/flat-list/ListHeader";
import List from "@/components/flat-list/List";
import NoListItems from "@/components/flat-list/item/NoListItems";
import {
  formatTimestamp,
  truncateString,
} from "../../utilities/transactions-utilities";
import { useState } from "react";
import { FlatList, useColorScheme, View } from "react-native";
import Balance from "@/components/Balance";
import format from "@testing-library/react-native/build/helpers/format";
import Row from "@/components/grid/Row";
import Column from "@/components/grid/Column";
import { ProgressBar } from "@react-native-community/progress-bar-android";

const Details = () => {
  const colorScheme = useColorScheme();
  const { id } = useLocalSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  console.log("ID: ", id);

  const { refetch, isPending, isError, data, error, isFetching, isLoading } =
    useQuery<GoalProps>({
      queryKey: ["goal", "goal " + id],
      queryFn: () => fetchGoalById(id as string),
      refetchOnMount: true,
    });

  // console.log("Data: ", data);
  const calculateBalanceUpTo = (index: number) => {
    return data?.transactions
      .slice(0, index + 1) // Get all transactions up to the specified index
      .reduce(
        (totalBalance, transaction) => totalBalance + transaction.amount,
        0
      );
  };

  if (isPending || isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (isError) {
    console.log("Error: ", error);
    return <OnError error={error.message} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppThemedText
        style={{ textAlign: "center", paddingTop: 10, paddingBottom: 2.5 }}
        type="title"
      >
        {data.name}
      </AppThemedText>
      <Balance
        balance={100}
        data={[{ data: data.expectedEndDate, amount: data.currentBalance }]}
        setIsVisible={setIsVisible}
      />

      <AppThemedView style={[styles.section]}>
        <AppThemedText
          style={[styles.sectionTitle, { textAlign: "center" }]}
          type="subtitle"
        >
          {data.name} Details
        </AppThemedText>
        <Row style={{}}>
          <Column colStyles={{ alignSelf: "flex-start" }}>
            <View>
              <AppThemedText
                style={[styles.text, { fontSize: 12, marginBottom: -10 }]}
                type="default"
              >
                Description
              </AppThemedText>
              <AppThemedText type="default" style={[styles.text]}>
                {truncateString(data.description, 25)}
              </AppThemedText>
            </View>

            <View>
              <AppThemedText
                style={[styles.text, { fontSize: 12, marginBottom: -10 }]}
                type="default"
              >
                Start Date
              </AppThemedText>
              <AppThemedText style={[styles.text]} type="default">
                {formatTimestamp(data.startDate)}
              </AppThemedText>
            </View>

            <View>
              <AppThemedText
                style={[styles.text, { fontSize: 12, marginBottom: -10 }]}
                type="default"
              >
                Starting Balance
              </AppThemedText>
              <AppThemedText style={styles.text} type="default">
                ${data.startingBalance.toFixed(2)}
              </AppThemedText>
            </View>

            <View>
              <AppThemedText
                style={[styles.text, { fontSize: 12, marginBottom: -10 }]}
                type="default"
              >
                Current Balance
              </AppThemedText>
              <AppThemedText style={styles.text} type="default">
                ${data.currentBalance.toFixed(2)}
              </AppThemedText>
            </View>

            <View>
              <AppThemedText
                style={[styles.text, { fontSize: 12, marginBottom: -10 }]}
                type="default"
              >
                Committment
              </AppThemedText>
              <AppThemedText style={styles.text} type="default">
                ${data.pledge?.toFixed(2) ?? 0}
              </AppThemedText>
            </View>
          </Column>

          <Column>
            <View>
              <AppThemedText
                style={[styles.text, { fontSize: 12, marginBottom: -10 }]}
                type="default"
              >
                Is Long term
              </AppThemedText>
              <AppThemedText style={styles.text} type="default">
                {data.isLongTerm ? "Long term" : "Short term"}
              </AppThemedText>
            </View>

            <View>
              <AppThemedText
                style={[styles.text, { fontSize: 12, marginBottom: -10 }]}
                type="default"
              >
                Expected End Date
              </AppThemedText>
              <AppThemedText style={styles.text} type="default">
                {formatTimestamp(data.expectedEndDate)}
              </AppThemedText>
            </View>

            <View>
              <AppThemedText
                style={[styles.text, { fontSize: 12, marginBottom: -10 }]}
                type="default"
              >
                Goal
              </AppThemedText>
              <AppThemedText style={styles.text} type="default">
                ${data.goal.toFixed(2)}
              </AppThemedText>
            </View>

            <View>
              <AppThemedText
                style={[styles.text, { fontSize: 12, marginBottom: -10 }]}
                type="default"
              >
                Last Transaction
              </AppThemedText>
              <AppThemedText style={styles.text} type="default">
                {formatTimestamp(data.lastTransactionDate)}
              </AppThemedText>
            </View>

            <View>
              <AppThemedText
                style={[styles.text, { fontSize: 12, marginBottom: -10 }]}
                type="default"
              >
                How Often
              </AppThemedText>
              <AppThemedText style={styles.text} type="default">
                {data.howOften ?? "N/A"}
              </AppThemedText>
            </View>
          </Column>
        </Row>
      </AppThemedView>
      <AppThemedText
        type="default"
        style={{ fontSize: 16, fontWeight: "bold" }}
      >
        Progress {data.progress}%
      </AppThemedText>
      <ProgressBar
        styleAttr="Horizontal"
        indeterminate={false}
        color={COLORS.primary}
        progress={data.progress / 100}
        style={{ marginHorizontal: s(15), marginBottom: vs(10) }}
      />

      <AppThemedText type="subtitle" style={{ textAlign: "center" }}>
        Contribution Record
      </AppThemedText>

      <ShowIf
        condition={data.transactions.length > 0}
        render={
          <ListWrapper>
            <ListHeader
              rowStyles={{ justifyContent: "space-between" }}
              headings={["Date", "Amount", "Balance"]}
            />
            <FlatList
              data={data.transactions}
              renderItem={({ item: transaction, index }) => (
                <Row style={{ justifyContent: "space-between"  }} key={transaction.id}>
                  <Column colStyles={{}}>
                    <AppThemedText style={{ fontSize: 16 }} type="default">
                      {formatTimestamp(transaction.date).slice(0, 5)}
                    </AppThemedText>
                  </Column>
                  <Column colStyles={{}}>
                    <AppThemedText style={{ fontSize: 16 }} type="default">
                      ${transaction.amount}
                    </AppThemedText>
                  </Column>
                  <Column colStyles={{}}>
                    <AppThemedText style={{ fontSize: 16 }} type="default">
                      ${calculateBalanceUpTo(index)}
                    </AppThemedText>
                  </Column>
                </Row>
              )}
            />
          </ListWrapper>
        }
        renderElse={<NoListItems setIsVisible={setIsVisible} type="Goal" />}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  section: {
    width: "100%",
    marginVertical: vs(10),
    paddingHorizontal: s(20),
    borderRadius: s(10),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: s(5),
    elevation: 3,
    alignSelf: "center",
  },
  sectionTitle: {
    marginBottom: vs(10),
  },
  text: {
    fontSize: s(14),
  },
});

export default Details;
