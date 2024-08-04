import { TransactionProps } from "@/app/types";
import Toast from "react-native-toast-message";
import { getFireApp } from "@/getFireApp";
import { parseDate, validateFormInputs } from "../utilities/balance-utilities";

// Purpose: tabs api request functions

/**
 * Adds or updates a transaction in Firestore.
 * @param amount The amount of the transaction.
 * @param date The date of the transaction.
 * @param description The description of the transaction.
 * @param transactionId The ID of the transaction.
 * @param setAmount A function to set the amount state.
 * @param setDate A function to set the date state.
 * @param setDescription A function to set the description state.
 * @param setTransactionId A function to set the transaction ID state.
 */
export const addOrUpdateTransaction = async (
    amount: string,
    date: string,
    description: string,
    transactionId: string,
    setAmount: React.Dispatch<React.SetStateAction<string>>,
    setDate: React.Dispatch<React.SetStateAction<string>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    setTransactionId: React.Dispatch<React.SetStateAction<string>>
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

    try {
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

        if (transactionId) {
            await transactionsRef.doc(transactionId).update(transactionData);
        } else {
            await transactionsRef.add(transactionData);
        }
        setAmount("");
        setDate("");
        setDescription("");
        setTransactionId("");
    } catch (error: unknown) {
        if (typeof error === "string") {
            Toast.show({
                type: "error",
                text1: "Error saving transaction.",
                text2: error,
            });
            console.error(error);
        } else if (error instanceof Error) {
            Toast.show({
                type: "error",
                text1: "Error saving transaction.",
                text2: error.message,
            });

            console.error(
                "Error adding or updating transaction(s) in Firebase: ",
                error.message
            );
            console.error("StackTrace: ", error.stack);
        } else {
            console.error("An unknown error occurred.");
        }
    }
};

/**
 * Fetches transactions from Firestore.
 * @returns A promise that resolves to an array of transactions.
 */
export const fetchTransactions = async (): Promise<TransactionProps[]> => {
    let transactions: TransactionProps[] = [];
    try {
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
        transactions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as TransactionProps[];

        if (!transactions) {
            transactions = [];
        }
    } catch (error: unknown) {
        if (typeof error === 'string') {
            Toast.show({
                type: "error",
                text1: "Error fetching transactions.",
                text2: error,
            });
            console.error(error);
        } else if (error instanceof Error) {
            Toast.show({
                type: "error",
                text1: "Error fetching transactions.",
                text2: error.message,
            });
            console.error("Error fetching transactions: ", error.message);
            console.error("StackTrace: ", error.stack);
        } else {
            console.error("An unknown error occurred.");
        }
    }
    return transactions;
};
