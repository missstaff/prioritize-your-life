import React, { useContext, useMemo, useState } from "react";
import Toast from "react-native-toast-message";
import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import AppModal from "@/components/modal/Modal";
import AppThemedSafeAreaView from "@/components/app_components/AppThemedSafeAreaView";
import AppThemedText from "@/components/app_components/AppThemedText";
import ListHeader from "@/components/flat-list/ListHeader";
import Balance from "@/components/Balance";
import List from "@/components/flat-list/List";
import ListWrapper from "@/components/flat-list/ListWrapper";
import LoadingSpinner from "@/components/LoadingSpinner";
import NoListItems from "@/components/flat-list/item/NoListItems";
import OnError from "@/components/OnError";
import ShowIf from "@/components/ShowIf";
import TabbedComponent from "@/components/TabbedComponent";
import TransactionModalContent from "@/components/modal/modal_content/TransactionModalContent";
import { AppContext } from "@/store/app/app-context";
import { TransactionContext } from "@/store/transaction/transaction-context";
import { fetchTransactions } from "../apis/transaction-apis";
import { TransactionState } from "@/store/transaction/transaction-reducer";

const Transactions = () => {
  const appCtx = useContext(AppContext);
  const transactionCtx = useContext(TransactionContext);
  const { setAmount, setDate, setDescription, setTransactionId } =
    transactionCtx;
  const { selectedTab, setSelectedTab } = appCtx;
  const [isVisible, setIsVisible] = useState(false);
  const tabsArr = ["Checking", "Savings"];

  const { refetch, isPending, isError, data, error, isFetching, isLoading } =
    useQuery<TransactionState[]>({
      queryKey: ["transactions ", "transactions " + tabsArr[selectedTab]],
      queryFn: () => fetchTransactions(tabsArr[selectedTab]),
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    });

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
  };

  const balance = useMemo(() => {
    return data?.reduce((acc, curr) => acc + Number(curr?.amount), 0);
  }, [data]);

  if (isPending || isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <OnError error={error} />;
  }

  return (
    <AppThemedSafeAreaView>
      <ShowIf
        condition={!isVisible}
        render={
          <>
            <AppThemedText
              style={{
                textAlign: "center",
                paddingTop: 10,
                paddingBottom: 2.5,
              }}
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
                <Balance
                  key={index}
                  balance={balance}
                  data={data}
                  setIsVisible={setIsVisible}
                />
              ))}
            </TabbedComponent>

            <ShowIf
              condition={data?.length > 0}
              render={
                <ListWrapper>
                  <ListHeader
                    colStyles={{ width: "33%" }}
                    rowStyles={{ justifyContent: "space-between", marginLeft: 15 }}
                    headings={["Date", "Amount", "Description"]}
                  />
                  <List
                    queryFn={() => fetchTransactions(tabsArr[selectedTab])}
                    queryKey={[
                      "transactions",
                      "transactions " + tabsArr[selectedTab],
                    ]}
                    handleOnPress={handleOnPress}
                  />
                </ListWrapper>
              }
              renderElse={
                <NoListItems setIsVisible={setIsVisible} type="Transaction" />
              }
            />
          </>
        }
        renderElse={
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
      <StatusBar style="auto" />
    </AppThemedSafeAreaView>
  );
};

export default Transactions;
