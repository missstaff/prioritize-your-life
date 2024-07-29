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
  if (!description || !amount || !date) {
    Toast.show({
      type: "error",
      text1: "Error adding transaction.",
      text2: "Please try again.",
    });
    return;
  }

  if (!validateFormInputs(amount, date, description)) {
    Toast.show({
      type: "error",
      text1: "Error adding transaction.",
      text2: "Please try again.",
    });
    return;
  }

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

  amount = Number(amount).toFixed(2);

  const numericAmount = parseFloat(amount).toFixed(2);
  if (isNaN(numericAmount as any)) {
    Toast.show({
      type: "error",
      text1: "Invalid amount.",
      text2: "Please enter a valid number.",
    });
    return;
  }

  const newTransaction: Omit<TransactionProps, "id"> = {
    date: parseDate(date),
    description,
    amount: numericAmount,
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
export const fetchTransactions = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<TransactionProps[]> => {
  setLoading(true);
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
  setLoading(false);
  return transactions;
};

/**
 * Validates the date to ensure it is in the format MM-DD-YY.
 * @param date The date string to validate.
 * @returns `true` if the date is valid, otherwise `false`.
 */
export const isValidDate = (date: string): boolean => {
  if (date.includes("-")) {
    date = date.replace(/-/g, "/");
  } else if (date.length === 6) {
    date = `${date.slice(0, 2)}/${date.slice(2, 4)}/${date.slice(4)}`;
  }
  const regex = /^(0[1-9]|1[0-2])[/](0[1-9]|[12][0-9]|3[01])[/]\d{2}$/;
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
  const regex = /^.{1,20}$/;
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

export const validateFormInputs = (
  amount: string,
  date: string,
  description: string
): boolean => {
  console.log("amount: ", amount);
  console.log("date: ", date);
  console.log("description: ", description);
  let isValid = false;
  if (
    isValidAmount(amount) &&
    isValidDate(date) &&
    isValidDescription(description)
  ) {
    isValid = true;
  }
  return isValid;
};

/**
 * Parses a date string in the format MM-DD-YY to a Date object.
 * @param dateStr The date string to parse.
 * @returns A Date object representing the parsed date.
 */
const parseDate = (dateStr: string): Date => {
  let month, day, year;

  if (dateStr.includes("/")) {
    // Format: MM/DD/YY
    [month, day, year] = dateStr.split("/").map(Number);
  } else if (dateStr.includes("-")) {
    // Format: MM-DD-YY
    [month, day, year] = dateStr.split("-").map(Number);
  } else {
    // Format: MMDDYY
    if (dateStr.length !== 6) {
      return new Date(); // Invalid format, return current date
    }
    month = Number(dateStr.slice(0, 2));
    day = Number(dateStr.slice(2, 4));
    year = Number(dateStr.slice(4, 6));
  }

  const parsedYear = year + 2000; // Adjust year for '20' prefix
  const parsedDate = new Date(parsedYear, month - 1, day); // month is 0-indexed

  return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
};
