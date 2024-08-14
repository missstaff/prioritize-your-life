import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { ScaledSheet, s, vs } from "react-native-size-matters";
import AppModal from "@/components/modal/Modal";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import LoadingSpinner from "@/components/LoadingSpinner";
import ShowIf from "@/components/ShowIf";
import TransactionModalContent from "@/components/modal/modal_content/TransactionModalContent";
import TabbedComponent from "@/components/TabbedComponent";
import { fetchTransactions } from "./apis/api";
import { COLORS } from "@/constants/Colors";
import ListHeader from "@/components/flat-list/ListHeader";
import { TransactionProps } from "../types";
import ListTransactions from "@/components/flat-list/ListTransactions";


export default function Balance() {
  const colorScheme = useColorScheme();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const tabsArr = ["Checking", "Savings"];

  const { refetch, isPending, isError, data, error } = useQuery<
    TransactionProps[]
  >({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(tabsArr[selectedTab]),
    refetchOnMount: true,
  });

  useEffect(() => {
    refetch();
  }, [selectedTab]);

  const balance = data?.reduce((acc, curr) => acc + Number(curr.amount), 0);

  if (isPending === true) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <AppThemedView
        style={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AppThemedText>Error: {error.message}</AppThemedText>
        <AppThemedText type="link" onPress={() => router.push("/")}>
          Home
        </AppThemedText>
      </AppThemedView>
    );
  }

  return (
    <>
      <AppThemedView
        style={[
          styles.container,
          {
            backgroundColor:
              colorScheme === "dark" ? COLORS.black : COLORS.white,
          },
        ]}
      >
        <AppThemedText
          style={{ textAlign: "center", paddingTop: 25 }}
          type="title"
        >
          Transactions
        </AppThemedText>
        <TabbedComponent 
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={tabsArr}>
          {tabsArr.map((tab, index) => (
            <AppThemedView key={index}>
              <AppThemedView
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginBottom: 20,
                  marginTop: 20,
                }}
              >
                <AppThemedText>
                  {!data?.length ? "$0.00" : "$" + balance?.toFixed(2)}
                </AppThemedText>
                <AppThemedText type="link" onPress={() => [setIsVisible(true)]}>
                  Add Transaction
                </AppThemedText>
              </AppThemedView>
              <ListHeader
                styles={styles.tableHeader}
                headings={["Date", "Amount", "Description"]}
              />
              <ShowIf
                condition={
                  !isPending && !isError && !isVisible && data?.length > 0
                }
                render={
                  <ListTransactions
                    data={data}
                    setIsVisible={setIsVisible}
                    setAmount={setAmount}
                    setDate={setDate}
                    setDescription={setDescription}
                    setTransactionId={setTransactionId}
                  />
                }
                renderElse={
                  <AppThemedView
                    style={{
                      height: "50%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AppThemedText style={{ textAlign: "center" }}>
                      No transactions
                    </AppThemedText>
                  </AppThemedView>
                }
              />
            </AppThemedView>
          ))}
        </TabbedComponent>
      </AppThemedView>

      <ShowIf
        condition={!isPending && !isError && isVisible}
        render={
          <AppModal
            onClose={() => [
              setIsVisible(false),
              setAmount(""),
              setDate(""),
              setDescription(""),
              setTransactionId(""),
              refetch(),
            ]}
            visible={isVisible}
          >
            <TransactionModalContent
              amount={amount}
              data={data}
              date={date}
              description={description}
              selectedTab={tabsArr[selectedTab]}
              transactionId={transactionId}
              setAmount={setAmount}
              setDate={setDate}
              setDescription={setDescription}
              setIsVisible={setIsVisible}
              setTransactionId={setTransactionId}
              refetch={refetch}
            />
          </AppModal>
        }
      />
    </>
  );
}

{
  /** move in to styles.ts */
}
const styles = ScaledSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    width: "100%",
    marginVertical: vs(5),
    paddingVertical: s(10),
    paddingHorizontal: s(5),
    borderRadius: s(10),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: s(5),
    elevation: 3,
    height: "100%",
    maxHeight: "100%",
  },
  tableHeader: {
    fontWeight: "bold",
  },
});
