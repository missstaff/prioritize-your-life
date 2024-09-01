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
       // use reduce function to get the current balance
        if(goalsContext.transactions.length > 0) {
            currentBalance = goalsContext.transactions.reduce((acc, transaction) => {
                return acc + transaction.amount;
            }, 0);
        }else{
            currentBalance = parseFloat(goalsContext.startingBalance);
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
            currentBalance: currentBalance,
            description: goalsContext.description,
            expectedEndDate: convertToTimestamp(goalsContext.expectedEndDate),
            goal: parseFloat(goalsContext.goal),
            name: goalsContext.name,
            progress: currentBalance/parseFloat(goalsContext.goal) * 100,
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


export const fetchGoals = async (selectedTab: string): Promise<GoalProps[]> => {
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

        const isLongTerm = selectedTab === "Long Term";
        data = data.filter((goal) => {
            return goal.isLongTerm === isLongTerm;
        });

        if (!data) {
            data = [];
        }
    } catch (error: any) {
        throw new Error("Error fetching goals: " + error.message);
    }
    return data;
};

export const fetchGoalById = async (goalId: string): Promise<GoalProps> => {
    let data: GoalProps = {} as GoalProps;
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
        const snapshot = await transactionsRef.doc(goalId).get();
        data = {
            id: snapshot.id,
            ...snapshot.data(),
        } as GoalProps;

        if (!data) {
            data = {} as GoalProps;
        }
    } catch (error: any) {
        throw new Error("Error fetching goal by id: " + error.message);
    }
    return data;
};
