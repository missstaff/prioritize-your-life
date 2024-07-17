import React, { useState } from "react";
import Toast from "react-native-toast-message";
import {
  useColorScheme,
  TextInput,
  Button,
  FlatList,
  View,
} from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { s, vs, ScaledSheet } from "react-native-size-matters";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { getFireApp } from "@/getFireApp";
import { COLORS } from "@/constants/Colors";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
}

export default function Balances() {
  const colorScheme = useColorScheme();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // #TODO:move to ts file
  const fetchTransactions = async (): Promise<Transaction[]> => {
    const firebase = await getFireApp();
    if (!firebase) {
      throw new Error("Firebase app not initialized");
    }
    const db = firebase.firestore();
    const uid = firebase.auth().currentUser?.uid;
    if (!uid) {
      throw new Error("User not authenticated");
    }

    const transactionsRef = db
      .collection("users")
      .doc(uid)
      .collection("transactions");
    const snapshot = await transactionsRef.orderBy("date", "desc").get();
    const transactions: Transaction[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Transaction[];
    return transactions;
  };

  const { data: transactions = [], refetch } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    refetchOnMount: true,
  });

    // #TODO:move to ts file
  const addTransaction = async () => {
    const firebase = await getFireApp();
    if (!description || !amount) {
      Toast.show({
        type: "error",
        text1: "Error adding transaction.",
        text2: "Please enter a description and amount.",
      });
      return;
    }
    if (!firebase) {
      throw new Error("Firebase app not initialized");
    }

    const db = firebase.firestore();
    const uid = firebase.auth().currentUser?.uid;
    if (!uid) {
      throw new Error("User not authenticated");
    }

    const transactionsRef = db
      .collection("users")
      .doc(uid)
      .collection("transactions");

    const newTransaction: Omit<Transaction, "id"> = {
      date: new Date().toISOString(),
      description,
      amount: parseFloat(amount),
    };

    await transactionsRef.add(newTransaction);
    setAmount("");
    setDescription("");
  };

  const addTransactionMutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      refetch();
    },
    onError: (error) => {
      const errorMessage =
        "Error adding transaction: " +
        (error.message ?? "Unknown error occurred.");
      Toast.show({
        type: "error",
        text1: "Error adding transaction.",
        text2: errorMessage,
      });
    },
  });

  return (
    <>
      <AppThemedView style={styles.container}>
        <AppThemedView
          style={[
            styles.section,
            {
              backgroundColor:
                colorScheme === "dark" ? COLORS.mediumGray : COLORS.white,
            },
          ]}
        >
          <AppThemedText type="title">Transactions</AppThemedText>
          <AppThemedText type="title">Add Transaction</AppThemedText>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <Button title="Add" onPress={() => addTransactionMutation.mutate()} />
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <AppThemedText>{item.date}</AppThemedText>
                <AppThemedText>{item.description}</AppThemedText>
                <AppThemedText>{item.amount.toFixed(2)}</AppThemedText>
              </View>
            )}
            ListHeaderComponent={() => (
              <View style={styles.tableRow}>
                <AppThemedText style={[styles.tableCell, styles.tableHeader]}>
                  Date
                </AppThemedText>
                <AppThemedText style={[styles.tableCell, styles.tableHeader]}>
                  Description
                </AppThemedText>
                <AppThemedText style={[styles.tableCell, styles.tableHeader]}>
                  Amount
                </AppThemedText>
              </View>
            )}
          />
        </AppThemedView>
      </AppThemedView>
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: vs(20),
  },
  section: {
    width: "90%",
    marginVertical: vs(5),
    padding: s(20),
    borderRadius: s(10),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: s(5),
    elevation: 3,
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: vs(5),
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  tableHeader: {
    fontWeight: "bold",
  },
});
