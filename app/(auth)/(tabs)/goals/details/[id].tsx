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
import { formatTimestamp } from "../../utilities/transactions-utilities";
import { useState } from "react";
import { useColorScheme } from "react-native";
import Balance from "@/components/Balance";

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

  if (isPending || isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (isError) {
    console.log("Error: ", error);
    return <OnError error={error.message} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppThemedText style={{ textAlign: "center", paddingTop: 10, paddingBottom: 2.5 }} type="title">
        {data.name}
      </AppThemedText>
       <Balance
                balance={100}
                data={[{date: "2021-10-10", amount: 100}]}
                setIsVisible={setIsVisible}
              />

      <AppThemedView style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <AppThemedView
          style={[
            styles.section,
            // {
            //   backgroundColor:
            //     colorScheme === "dark" ? COLORS.mediumGray : COLORS.white,
            // },
          ]}
        >
          <AppThemedText style={styles.sectionTitle} type="defaultSemiBold">
            {data.name} Progress
          </AppThemedText>
          <AppThemedText style={styles.text}>
            Enter and view your account balances here.
          </AppThemedText>
        </AppThemedView>

      </AppThemedView>
      <ShowIf
        condition={data.transactions.length > 0}
        render={
          <ListWrapper>
            <AppThemedText type="subtitle" style={{ textAlign: "center"}}>
              Contribution Record
            </AppThemedText>
            <ListHeader headings={["Date", "Amount", "Progress"]} />
            {data.transactions.map((transaction, index) => {
              return (
                <AppThemedView key={index}>
                  <AppThemedText type="default">
                    {formatTimestamp(transaction.date)}
                  </AppThemedText>
                  <AppThemedText type="default">{transaction.amount}</AppThemedText>
                  <AppThemedText type="default">10</AppThemedText>
                </AppThemedView>
              );
            })}
          </ListWrapper>
        }
        renderElse={<NoListItems setIsVisible={setIsVisible} type="Goal" />}
      />
      {/* <AppThemedView
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      > */}
      {/* <AppThemedText
          style={{ textAlign: "center" }}
          type="title"
        >
          {data.name}
        </AppThemedText> */}

      {/* <AppThemedView style={[styles.section]}>
          <AppThemedText style={styles.text}>
            View details about your goal here.
          </AppThemedText>
        </AppThemedView> */}

      {/* <AppThemedView style={[styles.section]}> */}
      {/* <AppThemedText style={styles.text}>
            View details about your goal here.
          </AppThemedText> */}

      {/* </AppThemedView>
      </AppThemedView> */}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  section: {
    width: "90%",
    marginVertical: vs(10),
    padding: s(20),
    borderRadius: s(10),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: s(5),
    elevation: 3,
    alignItems: "center",
  },
  sectionTitle: {
    // fontSize: s(18),
    // fontWeight: "bold",
    // marginBottom: vs(10),
  },
  text: {
    // fontSize: s(16),
    // textAlign: "center",
  },
});

export default Details;
