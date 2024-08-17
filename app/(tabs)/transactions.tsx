import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ScaledSheet, s, vs } from "react-native-size-matters";
import AppModal from "@/components/modal/Modal";
import ListHeader from "@/components/flat-list/ListHeader";
import ListTransactions from "@/components/flat-list/ListTransactions";
import LoadingSpinner from "@/components/LoadingSpinner";
import OnError from "@/components/navigation/OnError";
import ShowIf from "@/components/ShowIf";
import Toast from "react-native-toast-message";
import TabbedComponent from "@/components/TabbedComponent";
import TransactionModalContent from "@/components/modal/modal_content/TransactionModalContent";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { TransactionContext } from "@/store/transaction-context";
import { TransactionState } from "@/store/transaction-reducer";
import { fetchTransactions } from "./apis/api";
import { COLORS } from "@/constants/Colors";


export default function Balance() {
  const transactionCtx = useContext(TransactionContext);
  const { setAmount, setDate, setDescription, setTransactionId } =
    transactionCtx;
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const tabsArr = ["Checking", "Savings"];

  const { refetch, isPending, isError, data, error } = useQuery<
    TransactionState[]
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
    return <OnError error={error} />;
  }

  return (
    <>
      <AppThemedText
        style={{ textAlign: "center", paddingTop: 25 }}
        type="title"
      >
        Transactions
      </AppThemedText>
      <TabbedComponent
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={tabsArr}
      >
        {tabsArr.map((tab, index) => (
          <AppThemedView
            key={index}
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
        ))}
      </TabbedComponent>
      <ShowIf
        condition={!isPending && !isError && !isVisible && data?.length > 0}
        render={
          <>
            <AppThemedView style={[styles.container]}>
              <ListHeader
                styles={styles.tableHeader}
                headings={["Date", "Amount", "Description"]}
              />
              <ListTransactions data={data} setIsVisible={setIsVisible} />
            </AppThemedView>
          </>
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
              data={data}
              selectedTab={tabsArr[selectedTab]}
              setIsVisible={setIsVisible}
              refetch={refetch}
            />
            <Toast />
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
