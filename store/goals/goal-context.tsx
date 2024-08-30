import React, { createContext, useReducer, ReactNode } from "react";
import {
    goalReducer,
    GoalState,
    GoalTransactionState,
    Action,
} from "./goal-reducer";

export interface GoalContextType extends GoalState {
    setCurrentBalance: (currentBalance: number) => void;
    setDescription: (description: string) => void;
    setExpectedEndDate: (expectedEndDate: string) => void;
    setGoal: (goal: string) => void;
    setHowOften: (howOften: string) => void;
    setIsLongTerm: (isLongTerm: boolean) => void;
    setLastTransactionDate: (lastTransactionDate: string) => void;
    setName: (name: string) => void;
    setPledge: (committing: string) => void;
    setStartDate: (startDate: string) => void;
    setStartingBalance: (startingBalance: string) => void;
    setTransactions: (transactions: GoalTransactionState[]) => void;
}

export const GoalContext = createContext<GoalContextType>({
    id: "",
    currentBalance: 0,
    description: "",
    expectedEndDate: "",
    goal: "",
    howOften: "",
    isLongTerm: false,
    lastTransactionDate: "",
    name: "",
    pledge: "",
    startDate: "",
    startingBalance: "",
    transactions: [],
    setCurrentBalance: () => {},
    setDescription: () => {},
    setExpectedEndDate: () => {},
    setGoal: () => {},
    setHowOften: () => {},
    setIsLongTerm: () => {},
    setLastTransactionDate: () => {},
    setName: () => {},
    setPledge: () => {},
    setStartDate: () => {},
    setStartingBalance: () => {},
    setTransactions: () => {},
});

interface GoalContextProviderProps {
    children: ReactNode;
}

export const GoalContextProvider = ({
    children,
}: GoalContextProviderProps) => {
    const [state, dispatch] = useReducer<React.Reducer<GoalState, Action>>(
        goalReducer,
        {
            id: "",
            currentBalance: 0,
            description: "",
            expectedEndDate: "",
            goal: "",
            howOften: "",
            isLongTerm: false,
            lastTransactionDate: "",
            name: "",
            pledge: "",
            startDate: "",
            startingBalance: "",
            transactions: [],
        }
    );

    const setCurrentBalance = (currentBalance: number) =>
        dispatch({ type: "CurrentBalance", currentBalance });
    const setDescription = (description: string) =>
        dispatch({ type: "Description", description });
    const setExpectedEndDate = (expectedEndDate: string) =>
        dispatch({ type: "ExpectedEndDate", expectedEndDate });
    const setGoal = (goal: string) => dispatch({ type: "Goal", goal });
    const setHowOften = (howOften: string) =>
        dispatch({ type: "HowOften", howOften });
    const setIsLongTerm = (isLongTerm: boolean) =>
        dispatch({ type: "IsLongTerm", isLongTerm });
    const setLastTransactionDate = (lastTransactionDate: string) =>
        dispatch({ type: "LastTransactionDate", lastTransactionDate });
    const setName = (name: string) => dispatch({ type: "Name", name });
    const setPledge = (pledge: string) =>
        dispatch({ type: "Pledge", pledge });
    const setStartDate = (startDate: string) =>
        dispatch({ type: "StartDate", startDate });
    const setStartingBalance = (startingBalance: string) =>
        dispatch({ type: "StartingBalance", startingBalance });
    const setTransactions = (transactions: GoalTransactionState[]) =>
        dispatch({ type: "Transactions", transactions });

    return (
        <GoalContext.Provider
            value={{
                ...state,
                setCurrentBalance,
                setDescription,
                setExpectedEndDate,
                setGoal,
                setHowOften,
                setIsLongTerm,
                setLastTransactionDate,
                setName,
                setPledge,
                setStartDate,
                setStartingBalance,
                setTransactions,
            }}
        >
            {children}
        </GoalContext.Provider>
    );
}