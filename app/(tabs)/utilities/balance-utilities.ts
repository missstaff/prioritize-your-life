// Purpose: Contains utility functions for the balance screen.
import Toast from "react-native-toast-message";
import { getFireApp } from "@/getFireApp";
import { TransactionProps } from "../../types";

/**
 * Adds a transaction to Firestore.
 * @param amount The amount of the transaction.
 * @param date The date of the transaction.
 * @param description The description of the transaction.
 * @param setAmount A function to set the amount state.
 * @param setDate A function to set the date state.
 * @param setDescription A function to set the description state.
 */
export const addTransaction = async (
  amount: string,
  date: string,
  description: string,
  setAmount: React.Dispatch<React.SetStateAction<string>>,
  setDate: React.Dispatch<React.SetStateAction<string>>,
  setDescription: React.Dispatch<React.SetStateAction<string>>
) => {
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

  const newTransaction: Omit<TransactionProps, "id"> = {
    date: date.toString(),
    description,
    amount: parseFloat(amount),
  };

  await transactionsRef.add(newTransaction);
  setAmount("");
  setDate("");
  setDescription("");
};

/**
 * Fetches the transactions for the current user from Firestore.
 * @returns An array of transactions.
 */
export const fetchTransactions = async (): Promise<TransactionProps[]> => {
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
  let transactions: TransactionProps[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TransactionProps[];

  if (!transactions) {
    transactions = [];
  }
  return transactions;
};

/**
 * Validates the date to ensure it is in the format MM-DD-YY.
 * @param date The date string to validate.
 * @returns `true` if the date is valid, otherwise `false`.
 */
export const isValidDate = (date: string): boolean => {
  const regex = /^(0[1-9]|1[0-2])[-/](0[1-9]|[12][0-9]|3[01])[-/]\d{2}$/;
  const isValid = regex.test(date);

  if (!isValid) {
    Toast.show({
      type: "error",
      text1: "Invalid date.",
      text2: "Please try again.",
    });
  }

  return isValid;
};

/**
 * Validates the description to ensure it is a string with no more than 50 characters.
 * @param description The description string to validate.
 * @returns `true` if the description is valid, otherwise `false`.
 */
export const isValidDescription = (description: string): boolean => {
  const regex = /^.{1,25}$/;
  const isValid = regex.test(description);
  if (!isValid) {
    Toast.show({
      type: "error",
      text1: "Entry must be less than 25 chars...",
      text2: "Please try again.",
    });
  }
  return isValid;
};

/**
 * Validates the amount to ensure it is a string representing a number greater than 0.
 * @param amount The amount string to validate.
 * @returns `true` if the amount is valid, otherwise `false`.
 */
export const isValidAmount = (amount: string): boolean => {
  const regex = /^-?\d+(\.\d+)?$/;
  const isValid = regex.test(amount);
  if (!isValid) {
    Toast.show({
      type: "error",
      text1: "Invalid entry.",
      text2: "Please enter a valid number.",
    });
  }
  return isValid;
};
