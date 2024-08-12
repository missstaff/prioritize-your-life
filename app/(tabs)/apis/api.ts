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
    data: TransactionProps[] | undefined,
    date: string,
    description: string,
    selectedTab: string,
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
            .collection(selectedTab.toLowerCase());

        amount = Number(amount).toFixed(2);
        console.log("amount: ", amount);
        const numericAmount = Number(parseFloat(amount).toFixed(2));
        console.log("numericAmount: ", numericAmount);
        if (isNaN(numericAmount)) {
            Toast.show({
                type: "error",
                text1: "Invalid transaction amount entry.",
                text2: "Please enter a valid number.",
            });
            return;
        }

        let updatedBalance = 0.00;
        if (data && data.length > 0) {
            updatedBalance = data.reduce((acc, transaction) => acc + Number(parseFloat(transaction.amount) + numericAmount),
                0
            );
            console.log("updatedBalance: inIF ", updatedBalance);
        } else {
            updatedBalance = numericAmount;
            console.log("updatedBalance: inElse ", updatedBalance);
        }

        const transactionData: Omit<TransactionProps, "id"> = {
            amount,
            balance: updatedBalance,
            date: parseDate(date),
            description,
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
        updatedBalance = 0.00;
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
 * Deletes a transaction from Firestore.
 * @param transactionId The ID of the transaction to delete.
 */
export const deleteTransaction = async (selectedTab: string, transactionId: string) => {
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
            .collection(selectedTab.toLowerCase());

        await transactionsRef.doc(transactionId).delete();
    } catch (error: unknown) {
        if (typeof error === "string") {
            Toast.show({
                type: "error",
                text1: "Error deleting transaction.",
                text2: error,
            });
            console.error(error);
        } else if (error instanceof Error) {
            Toast.show({
                type: "error",
                text1: "Error deleting transaction.",
                text2: error.message,
            });
            console.error("Error deleting transaction: ", error.message);
            console.error("StackTrace: ", error.stack);
        } else {
            console.error("An unknown error occurred.");
        }
    }
}

/**
 * Fetches transactions from Firestore.
 * @returns A promise that resolves to an array of transactions.
 */
export const fetchTransactions = async (selectedTab: string): Promise<TransactionProps[]> => {
    let data: TransactionProps[] = [];
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
        console.log("selectedTab: ", selectedTab);

        const transactionsRef = db
            .collection("users")
            .doc(uid)
            .collection(selectedTab.toLowerCase());
        const snapshot = await transactionsRef.orderBy("date", "desc").get();
        data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as TransactionProps[];

        if (!data) {
            data = [];
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
    return data;
};
