import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { useColorScheme, Button, FlatList, View } from "react-native";
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
import AppModal from "@/components/Modal";
import ShowIf from "@/components/ShowIf";

export default function Balance() {
  const colorScheme = useColorScheme();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const { data: transactions = [], refetch } = useQuery<TransactionProps[]>({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    refetchOnMount: true,
  });

  const addTransactionMutation = useMutation({
    mutationFn: () =>
      addTransaction(
        amount,
        date,
        description,
        setAmount,
        setDate,
        setDescription
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      refetch();
    },
    onError: (error) => {
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
           <View style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20, marginTop: 5}}>
           <AppThemedText>
              233.89
            </AppThemedText>
            <AppThemedText
              type="link"
              onPress={() => setModalVisible(true)}
            >
              Add Transaction
            </AppThemedText>
           </View>
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <AppThemedText  style={[{fontSize: s(12)}]}>{item.date}</AppThemedText>
                  <AppThemedText style={[styles.descriptionText, {fontSize: s(12)}]}>
                    {item.description}
                  </AppThemedText>
                  <AppThemedText style={[{fontSize: s(12)}]}>{item.amount}</AppThemedText>
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
          </AppThemedView>
        </AppThemedView>
      }
      renderElse={
        <AppModal onClose={() => setModalVisible(false)} visible={modalVisible}>
          <AppThemedTextInput
            checkValue={isValidDate}
            iconName="calendar"
            placeholder="Date"
            secureEntry={false}
            setValue={setDate}
            value={date}
            containerStyle={{
              backgroundColor: COLORS.white,
            }}
            inputStyle={{
              backgroundColor: COLORS.white,
              color: COLORS.black,
            }}
          />
          <AppThemedTextInput
            checkValue={isValidAmount}
            placeholder="Amount"
            secureEntry={false}
            setValue={setAmount}
            value={amount}
            containerStyle={{
              backgroundColor: COLORS.white,
            }}
            inputStyle={{
              backgroundColor: COLORS.white,
              color: COLORS.black,
            }}
          />
          <AppThemedTextInput
            checkValue={isValidDescription}
            placeholder="Description"
            secureEntry={false}
            setValue={setDescription}
            value={description}
            containerStyle={{
              backgroundColor: COLORS.white,
            }}
            inputStyle={{
              backgroundColor: COLORS.white,
              color: COLORS.black,
            }}
          />
          <Button title="Add" onPress={() => addTransactionMutation.mutate()} />
          <AppThemedText type="link" onPress={() => setModalVisible(false)}>
            Close
          </AppThemedText>
        </AppModal>
      }
    />
  );
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: "column",
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
    paddingHorizontal: s(25),
  },
});
