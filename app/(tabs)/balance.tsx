import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { useColorScheme, FlatList, View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { s, vs, ScaledSheet } from "react-native-size-matters";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { formatDate } from "./utilities/balance-utilities";
import { TransactionProps } from "../types";
import { COLORS } from "@/constants/Colors";
import AppModal from "@/components/modal/Modal";
import ShowIf from "@/components/ShowIf";
import LoadingSpinner from "@/components/LoadingSpinner";
import AddTransactionModalContent from "@/components/modal/modal_content/AddTransactionModalContent";
import { addTransaction, fetchTransactions } from "./apis/api";
import Row from "@/components/grid/Row";
import Column from "@/components/grid/Column";

export default function Balance() {
  const colorScheme = useColorScheme();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: transactions = [], refetch } = useQuery<TransactionProps[]>({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(setLoading),
    refetchOnMount: true,
  });

  const mutation = useMutation({
    mutationFn: () =>
      addTransaction(
        amount,
        date,
        description,
        setAmount,
        setDate,
        setDescription
      ),
    onSuccess: async () => {
      setLoading(false);
      await refetch();
      setModalVisible(false);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      setLoading(false);
      const errorMessage =
        "Error adding transaction: " +
        (error instanceof Error ? error.message : "Unknown error occurred.");
      Toast.show({
        type: "error",
        text1: "Error adding transaction.",
        text2: errorMessage,
      });
    },
  });

  return (
    <ShowIf
      condition={mutation.status === "pending" || loading}
      render={<LoadingSpinner />}
      renderElse={
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
                    width: "80%",
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
                    onPress={() => setModalVisible(true)}
                  >
                    Add Transaction
                  </AppThemedText>
                </View>
                {transactions.length > 0 && (
                  <FlatList
                    data={transactions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <Row>
                        <Column inlineStyles={{ width: "30%" }}>
                          <AppThemedText style={[{ fontSize: s(12) }]}>
                            {formatDate(item.date)}
                          </AppThemedText>
                        </Column>
                        <Column inlineStyles={{ width: "50%" }}>
                          <AppThemedText style={{ fontSize: s(12) }}>
                            {item.description}
                          </AppThemedText>
                        </Column>
                        <Column inlineStyles={{ width: "20%" }}>
                          <AppThemedText style={[{ fontSize: s(12) }]}>
                            {parseFloat(item.amount).toFixed(2)}{" "}
                          </AppThemedText>
                        </Column>
                      </Row>
                    )}
                    ListHeaderComponent={() => (
                      <Row>
                        <Column>
                          <AppThemedText style={styles.tableHeader}>
                            Date
                          </AppThemedText>
                        </Column>
                        <Column>
                          <AppThemedText style={styles.tableHeader}>
                            Description
                          </AppThemedText>
                        </Column>
                        <Column>
                          <AppThemedText style={styles.tableHeader}>
                            Amount
                          </AppThemedText>
                        </Column>
                      </Row>
                    )}
                  />
                )}
                {/**pagination? */}
              </AppThemedView>
            </AppThemedView>
          }
          renderElse={
            <AppModal
              onClose={() => setModalVisible(false)}
              visible={modalVisible}
            >
              <AddTransactionModalContent
                amount={amount}
                date={date}
                description={description}
                setAmount={setAmount}
                setDate={setDate}
                setDescription={setDescription}
                mutation={mutation}
                setModalVisible={setModalVisible}
              />
            </AppModal>
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
