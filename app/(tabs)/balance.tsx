import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { useColorScheme, FlatList, View } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { s, vs, ScaledSheet } from "react-native-size-matters";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import {
  addTransaction,
  fetchTransactions,
  isValidAmount,
  isValidDate,
  isValidDescription,
} from "./utilities/balance-utilities";
import { TransactionProps } from "../types";
import { COLORS } from "@/constants/Colors";
import AppModal from "@/components/modal/Modal";
import ShowIf from "@/components/ShowIf";
import LoadingSpinner from "@/components/LoadingSpinner";
import AddTransactionModalContent from "@/components/modal/modal_content/AddTransactionModalContent";

/**
 * Formats a Firestore Timestamp to a short date string (MM/DD).
 * @param timestamp The Firestore Timestamp to format.
 * @returns A formatted date string in MM/DD format.
 */
const formatDate = (timestamp: any): string => {
  const date = timestamp.toDate();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(2);
  return `${month}/${day}/${year}`;
};

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
        setDescription,
      ),
    onSuccess: async () => {
      setLoading(false)
      await refetch();
      setModalVisible(false);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      setLoading(false)
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
                  styles.section,
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
                  <AppThemedText type="link" onPress={() => setModalVisible(true)}>
                    Add Transaction
                  </AppThemedText>
                </View>
                {transactions.length > 0 && (
                  <FlatList
                    data={transactions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <View style={styles.tableRow}>
                        <AppThemedText style={[{ fontSize: s(12) }]}>
                          {formatDate(item.date)}
                        </AppThemedText>
                        <AppThemedText
                          style={[styles.descriptionText, { fontSize: s(12) }]}
                        >
                          {item.description}
                        </AppThemedText>
                        <AppThemedText style={[{ fontSize: s(12) }]}>
                          {parseFloat(item.amount).toFixed(2)} {/* Ensure two decimal places */}
                        </AppThemedText>
                      </View>
                    )}
                    ListHeaderComponent={() => (
                      <View style={styles.tableRow}>
                        <AppThemedText style={styles.tableHeader}>Date</AppThemedText>
                        <AppThemedText style={styles.tableHeader}>
                          Description
                        </AppThemedText>
                        <AppThemedText style={styles.tableHeader}>Amount</AppThemedText>
                      </View>
                    )}
                  />
                )}
                {/**pagination? */}
              </AppThemedView>
            </AppThemedView>
          }
          renderElse={
            <AppModal onClose={() => setModalVisible(false)} visible={modalVisible}>
              {/** move to a modal content jsx */}
              {/* <AppThemedTextInput
                checkValue={isValidDate}
                iconName="calendar"
                placeholder="MM/DD/YY"
                secureEntry={false}
                setValue={setDate}
                value={date}
              />
              <AppThemedTextInput
                checkValue={isValidAmount}
                placeholder="Amount"
                secureEntry={false}
                setValue={setAmount}
                value={amount}
              />
              <AppThemedTextInput
                checkValue={isValidDescription}
                placeholder="Description"
                secureEntry={false}
                setValue={setDescription}
                value={description}
              />
              <AppThemedText type="link" onPress={() => mutation.mutate()}>
                Add
              </AppThemedText>
              <AppThemedText type="link" onPress={() => setModalVisible(false)}>
                Close
              </AppThemedText> */}
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
{/** move in to styles.ts */}
const styles = ScaledSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: vs(20),
  },
  section: {
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
    maxHeight: "100%"
  },
  input: {
    width: "100%",
    padding: s(10),
    borderColor: COLORS.mediumGray,
    borderWidth: 1,
    borderRadius: s(5),
    marginVertical: vs(5),
  },
  tableRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: vs(5),
  },
  tableHeader: {
    fontWeight: "bold",
  },
  descriptionText: {
    flex: 1,
    paddingHorizontal: s(65),
  },
});
function invalidateQueries(arg0: { queryKey: string[]; }) {
  throw new Error("Function not implemented.");
}

