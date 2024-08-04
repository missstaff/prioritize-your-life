import React, { useState } from "react";
import { useColorScheme, FlatList, View, Pressable } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { ScaledSheet, s, vs } from "react-native-size-matters";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { formatDate, truncateString } from "./utilities/balance-utilities";
import { TransactionProps } from "../types";
import { COLORS } from "@/constants/Colors";
import AppModal from "@/components/modal/Modal";
import ShowIf from "@/components/ShowIf";
import LoadingSpinner from "@/components/LoadingSpinner";
import TransactionModalContent from "@/components/modal/modal_content/TransactionModalContent";
import { fetchTransactions } from "./apis/api";
import Row from "@/components/grid/Row";
import Column from "@/components/grid/Column";

export default function Balance() {
  const colorScheme = useColorScheme();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const {
    data: transactions = [],
    refetch,
    isPending,
    isError,
    data,
    error,
  } = useQuery<TransactionProps[]>({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(),
    refetchOnMount: true,
  });

  return (
    <ShowIf
      condition={isPending}
      render={<LoadingSpinner />}
      renderElse={
        <ShowIf
          condition={!isPending}
          render={
            <ShowIf
              condition={!modalVisible}
              render={
                <AppThemedView style={styles.container}>
                  <AppThemedView
                    style={[
                      styles.heading,
                      {
                        backgroundColor:
                          colorScheme === "dark" ? COLORS.black : COLORS.white,
                      },
                    ]}
                  >
                    <AppThemedText type="title">Transactions</AppThemedText>
                    <View
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                        marginTop: 5,
                      }}
                    >
                      <AppThemedText>233.89</AppThemedText>
                      <AppThemedText
                        type="link"
                        onPress={() => [setModalVisible(true)]}
                      >
                        Add Transaction
                      </AppThemedText>
                    </View>
                    <ShowIf
                      condition={transactions.length > 0 || modalVisible}
                      render={
                        <>
                          <Row>
                            <Column>
                              <AppThemedText style={styles.tableHeader}>
                                Date
                              </AppThemedText>
                            </Column>
                            <Column>
                              <AppThemedText style={styles.tableHeader}>
                                Amount
                              </AppThemedText>
                            </Column>
                            <Column>
                              <AppThemedText style={styles.tableHeader}>
                                Description
                              </AppThemedText>
                            </Column>
                          </Row>
                          <FlatList
                            data={transactions}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                              <Pressable
                                onPress={() => [
                                  setModalVisible(true),
                                  setAmount(item.amount),
                                  setDate(formatDate(item.date)),
                                  setDescription(item.description),
                                  setTransactionId(item.id),
                                ]}
                              >
                                <Row>
                                  <Column>
                                    <AppThemedText
                                      style={[{ fontSize: s(12) }]}
                                    >
                                      {formatDate(item.date)}
                                    </AppThemedText>
                                  </Column>
                                  <Column>
                                    <AppThemedText
                                      style={[{ fontSize: s(12) }]}
                                    >
                                      {parseFloat(item.amount).toFixed(2)}{" "}
                                    </AppThemedText>
                                  </Column>
                                  <Column>
                                    <AppThemedText style={{ fontSize: s(12) }}>
                                      {truncateString(item.description, 12)}
                                    </AppThemedText>
                                  </Column>
                                </Row>
                              </Pressable>
                            )}
                          />
                        </>
                      }
                    />
                  </AppThemedView>
                </AppThemedView>
              }
              renderElse={
                <AppModal
                  onClose={() => [
                    setModalVisible(false),
                    setAmount(""),
                    setDate(""),
                    setDescription(""),
                    setTransactionId(""),
                  ]}
                  visible={modalVisible}
                >
                  <TransactionModalContent
                    amount={amount}
                    date={date}
                    description={description}
                    transactionId={transactionId}
                    setAmount={setAmount}
                    setDate={setDate}
                    setDescription={setDescription}
                    setModalVisible={setModalVisible}
                    setTransactionId={setTransactionId}
                  />
                </AppModal>
              }
            />
          }
        />
      }
    />
  );
}

{
  /** move in to styles.ts */
}
const styles = ScaledSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: vs(20),
  },
  heading: {
    width: "100%",
    marginVertical: vs(5),
    padding: s(20),
    borderRadius: s(10),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: s(5),
    elevation: 3,
    alignItems: "center",
    height: "100%",
    maxHeight: "100%",
  },
  tableHeader: {
    fontWeight: "bold",
  },
});
