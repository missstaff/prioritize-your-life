import { TransactionProps } from "@/app/types";
import Toast from "react-native-toast-message";
import { parseDate, validateFormInputs } from "../utilities/balance-utilities";
import { getFireApp } from "@/getFireApp";


// Purpose: tabs api request functions


/**
 * Adds or updates a transaction in Firestore.
 * @param amount The amount of the transaction.
 * @param date The date of the transaction.
 * @param description The description of the transaction.
 * @param setAmount A function to set the amount state.
 * @param setDate A function to set the date state.
 * @param setDescription A function to set the description state.
 * @param transactionId (Optional) The ID of the transaction to update.
 */
export const addOrUpdateTransaction = async (
    amount: string,
    date: string,
    description: string,
    transactionId: string,
    setAmount: React.Dispatch<React.SetStateAction<string>>,
    setDate: React.Dispatch<React.SetStateAction<string>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    setTransactionId: React.Dispatch<React.SetStateAction<string>>,
) => {
    if (!description || !amount || !date) {
        Toast.show({
            type: "error",
            text1: "Error adding/updating transaction.",
            text2: "Please try again.",
        });
        return;
    }

    if (!validateFormInputs(amount, date, description)) {
        Toast.show({
            type: "error",
            text1: "Error adding/updating transaction.",
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

    const transactionData: Omit<TransactionProps, "id"> = {
        date: parseDate(date),
        description,
        amount: numericAmount,
    };

    try {
        if (transactionId) {
            await transactionsRef.doc(transactionId).update(transactionData);
        } else {
            await transactionsRef.add(transactionData);
        }
        setAmount("");
        setDate("");
        setDescription("");
        setTransactionId("");
    } catch (error: any) {
        Toast.show({
            type: "error",
            text1: "Error saving transaction.",
            text2: error.message,
        });
    }
};


/**
 * Fetches the transactions for the current user from Firestore.
 * @returns An array of transactions.
 */
export const fetchTransactions = async (
    // setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<TransactionProps[]> => {
    // setLoading(true);
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
    // setLoading(false);
    return transactions;
};
