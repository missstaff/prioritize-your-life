import React, { useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ScaledSheet, s, vs } from "react-native-size-matters";
import AppModal from "@/components/modal/Modal";
import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedView from "@/components/app_components/AppThemedView";
import ListHeader from "@/components/flat-list/ListHeader";
import ListTransactions from "@/components/flat-list/List";
import LoadingSpinner from "@/components/LoadingSpinner";
import OnError from "@/components/navigation/OnError";
import ShowIf from "@/components/ShowIf";
import Toast from "react-native-toast-message";
import TabbedComponent from "@/components/TabbedComponent";
import TransactionModalContent from "@/components/modal/modal_content/TransactionModalContent";
import { AppContext } from "@/store/app/app-context";
import { TransactionContext } from "@/store/transaction/transaction-context";
import { TransactionState } from "@/store/transaction/transaction-reducer";
import { fetchTransactions } from "./apis/transaction-apis";
import { COLORS } from "@/constants/Colors";
import Balance from "@/components/flat-list/Balance";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";

export default function Transactions() {
  const transactionCtx = useContext(TransactionContext);
  const { setAmount, setDate, setDescription, setTransactionId } =
    transactionCtx;
  const appCtx = useContext(AppContext);
  const { selectedTab, setSelectedTab } = appCtx;
  const [isVisible, setIsVisible] = useState(false);
  const tabsArr = ["Checking", "Savings"];

  const { refetch, isPending, isError, data, error, isFetching, isLoading } =
    useQuery<TransactionState[]>({
      queryKey: ["transactions", "transactions " + tabsArr[selectedTab]],
      queryFn: () => fetchTransactions(tabsArr[selectedTab]),
      refetchOnMount: true,
    });

  useEffect(() => {
    refetch();
  }, [selectedTab]);

  const handleClose = () => {
    setIsVisible(false);
    setAmount("");
    setDate("");
    setDescription("");
    setTransactionId("");
    refetch();
  };

  const handleOnPress = (item: TransactionState) => {
    setIsVisible(true);
    setAmount(item.amount);
    setDate(item.date);
    setDescription(item.description);
    setTransactionId(item.id);
  }


  const balance = useMemo(() => {
    return data?.reduce((acc, curr) => acc + Number(curr.amount), 0);
  }, [data]);

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
        Transactions
      </AppThemedText>
      <TabbedComponent
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={tabsArr}
      >
        {tabsArr.map((tab, index) => (
          <AppThemedView key={index} style={styles.balanceContainer}>
            <Balance
              key={index}
              balance={balance}
              data={data}
              setIsVisible={setIsVisible}
            />
          </AppThemedView>
        ))}
      </TabbedComponent>
      <ShowIf
        condition={!isPending && !isError && !isVisible && data?.length > 0}
        render={
          <AppThemedView style={styles.container}>
            <ListHeader
              styles={styles.tableHeader}
              headings={["Date", "Amount", "Description"]}
            />
            <ListTransactions
              queryFn={() => fetchTransactions(tabsArr[selectedTab])}
              queryKey={["transactions", "transactions " + tabsArr[selectedTab]]}
              handleOnPress={handleOnPress}
            />
          </AppThemedView>
        }
        renderElse={
          <AppThemedView
            style={{
              height: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AppThemedText style={{ paddingBottom: 10 }} type="default">
              No Transactions Found
            </AppThemedText>
            <AppThemedView>
              <AppThemedTouchableOpacity onPress={() => setIsVisible(true)}>
                Add Transaction
              </AppThemedTouchableOpacity>
            </AppThemedView>
          </AppThemedView>
        }
      />
      <ShowIf
        condition={!isPending && !isError && isVisible}
        render={
          <AppModal onClose={handleClose} visible={isVisible}>
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
    </AppThemedView>
  );
}

const styles = ScaledSheet.create({
  balanceContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
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
