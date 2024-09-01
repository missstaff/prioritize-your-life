import Toast from "react-native-toast-message";
import { getFireApp } from "@/getFireApp";
import { TransactionState } from "../../../store/transaction/transaction-reducer";
import { formatDate, validateFormInputs } from "../utilities/transactions-utilities";
import { TransactionProps } from "@/app/types";
import { TransactionContextType } from "@/store/transaction/transaction-context";
import { convertToTimestamp } from "@/common/utilities";

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
    data: TransactionState[] | undefined,
    selectedTab: string,
    transactionsCtx: TransactionContextType
) => {
    if (
        !transactionsCtx.description ||
        !transactionsCtx.amount ||
        !transactionsCtx.date
    ) {
        Toast.show({
            type: "error",
            text1: "Error adding/updating transaction.",
            text2: "Please try again.",
        });
        return;
    }

    if (
        !validateFormInputs(
            transactionsCtx.date,
            transactionsCtx.amount,
            transactionsCtx.description
        )
    ) {
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

        transactionsCtx.amount = Number(transactionsCtx.amount).toFixed(2);
        const numericAmount = Number(parseFloat(transactionsCtx.amount).toFixed(2));
        if (isNaN(numericAmount)) {
            throw new Error("Amount is not a number.");
        }

        let updatedBalance = 0.0;
        if (data && data.length > 0) {
            updatedBalance = data.reduce(
                (acc, transaction) =>
                    acc + Number(parseFloat(transaction.amount) + numericAmount),
                0
            );
        } else {
            updatedBalance = numericAmount;
        }

        const newDD = convertToTimestamp(transactionsCtx.date);
        const transactionData: Omit<TransactionProps, "id"> = {
            amount: numericAmount,
            balance: updatedBalance,
            date: newDD,
            description: transactionsCtx.description,
        };

        if (transactionsCtx.id) {
            await transactionsRef.doc(transactionsCtx.id).update(transactionData);
        } else {
            await transactionsRef.add(transactionData);
        }
        transactionsCtx.setAmount("");
        transactionsCtx.setDate("");
        transactionsCtx.setDescription("");
        transactionsCtx.setTransactionId("");
        updatedBalance = 0.0;
    } catch (error: any) {
        throw new Error("Error adding/updating transaction: " + error.message);
    }
};

/**
 * Deletes a transaction from Firestore.
 * @param selectedTab The selected tab.
 * @param transactionId The ID of the transaction to delete.
 * @returns A promise that resolves when the transaction is deleted.
 **/
export const deleteTransaction = async (
    selectedTab: string,
    transactionId: string
) => {
    const firebase = await getFireApp();
    try {
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
    } catch (error: any) {
        throw new Error("Error deleting transaction: " + error.message);
    }
};

/**
 * Fetches transactions from Firestore.
 * @returns A promise that resolves to an array of transactions.
 */
export const fetchTransactions = async (
    selectedTab: string
): Promise<TransactionState[]> => {
    let data: TransactionState[] = [];
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
        const snapshot = await transactionsRef.orderBy("date", "desc").get();
        data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as TransactionState[];

        if (!data) {
            data = [];
        }
    } catch (error: any) {
        throw new Error("Error fetching transactions: " + error.message);
    }

    for(const transaction of data) {
        transaction.date = formatDate(transaction.date);
    }
    return data;
};
