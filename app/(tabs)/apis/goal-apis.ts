import { GoalProps } from "@/app/types";
import { convertToTimestamp } from "@/common/utilities";
import { getFireApp } from "@/getFireApp";
import { GoalContext, GoalContextType } from "@/store/goals/goal-context";
import { GoalState, GoalTransactionState } from "@/store/goals/goal-reducer";
import { Timestamp } from "@react-native-firebase/firestore";
import { s } from "react-native-size-matters";


export const addOrUpdateGoal = async (
    goalsContext: GoalContextType,
    selectedTab: string,
) => {
    // if (!description || !amount || !date) {
    //     Toast.show({
    //         type: "error",
    //         text1: "Error adding/updating transaction.",
    //         text2: "Please try again.",
    //     });
    //     return;
    // }

    // if (!validateFormInputs(date, amount, description)) {
    //     Toast.show({
    //         type: "error",
    //         text1: "Error adding/updating transaction.",
    //         text2: "Please try again.",
    //     });
    //     return;
    // }

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
            .collection("goals");
      
        let currentBalance = 0.00;
        if (goalsContext.transactions && goalsContext.transactions.length > 0) {
            currentBalance = parseFloat(goalsContext.transactions.reduce((acc, transaction) => acc + transaction.amount,
            0
        ).toFixed(2));
        }
        
        if(goalsContext.startDate === "") {
            goalsContext.setStartDate(new Date().toISOString());
        }

        

        const goalTransaction: GoalTransactionState ={
            id: goalsContext.transactions.length + 1,
            amount:  (parseFloat(goalsContext.startingBalance)) ?? 0.00,
            balance: currentBalance,
            date: new Timestamp(new Date().getTime() / 1000, 0),
        };

        const transactionData: Omit<GoalProps, "id"> = {
            currentBalance: 0,
            description: goalsContext.description,
            expectedEndDate: convertToTimestamp(goalsContext.expectedEndDate),
            goal: parseFloat(goalsContext.goal),
            name: goalsContext.name,
            startDate: new Timestamp(new Date().getTime() / 1000, 0),
            startingBalance: parseFloat(goalsContext.startingBalance),
            transactions :  [...goalsContext.transactions, goalTransaction],
            isLongTerm: selectedTab === "Long Term",
            lastTransactionDate:new Timestamp(new Date().getTime() / 1000, 0),
        };

        if (goalsContext.id) {
            await transactionsRef.doc(goalsContext.id).update(transactionData);
        } else {
            await transactionsRef.add(transactionData);
        }
        goalsContext.setDescription("");
        goalsContext.setExpectedEndDate("");
        goalsContext.setGoal("");
        goalsContext.setName("");
        goalsContext.setStartDate("");
        goalsContext.setStartingBalance("");
        goalsContext.setTransactions([]);

    } catch (error: any) {
        throw new Error("Error adding/updating a savings goal: " + error.message);
    }
};


// export const deleteTransaction = async (selectedTab: string, transactionId: string) => {
//     const firebase = await getFireApp();
//     try {
//         if (!firebase) {
//             throw new Error("Firebase app not initialized");
//         }
//         const db = firebase.firestore();
//         const uid = firebase.auth().currentUser?.uid;
//         if (!uid) {
//             throw new Error("User not authenticated");
//         }
//         const transactionsRef = db
//             .collection("users")
//             .doc(uid)
//             .collection(selectedTab.toLowerCase());

//         await transactionsRef.doc(transactionId).delete();
//     } catch (error: any) {
//         throw new Error("Error deleting transaction: " + error.message);
//     }
// }


export const fetchGoals = async (): Promise<GoalProps[]> => {
    let data: GoalProps[] = [];
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
            .collection("goals");
        const snapshot = await transactionsRef.orderBy("startDate", "desc").get();
        data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as GoalProps[];

        if (!data) {
            data = [];
        }
    } catch (error: any) {
        throw new Error("Error fetching goals: " + error.message);
    }
    return data;
};
