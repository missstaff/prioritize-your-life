import React, { createContext, useReducer, ReactNode } from "react";
import {
  transactionReducer,
  TransactionState,
  Action,
} from "./transaction-reducer";

export interface TransactionContextType extends TransactionState {
  setAmount: (amount: string) => void;
  setDate: (date: string) => void;
  setDescription: (description: string) => void;
  setTransactionId: (id: string) => void;
  setBalance: (balance: number) => void;
}

/**
 * TransactionContext
 * @template TransactionContextType - The type of the transaction context.
 * @param {string} id - The transaction ID.
 * @param {string} amount - The transaction amount.
 * @param {number} balance - The transaction balance.
 * @param {string} date - The transaction date.
 * @param {string} description - The transaction description.
 * @param {Function} setAmount - Function to set the transaction amount.
 * @param {Function} setDate - Function to set the transaction date.
 * @param {Function} setDescription - Function to set the transaction description.
 * @param {Function} setTransactionId - Function to set the transaction ID.
 * @param {Function} setBalance - Function to set the transaction balance.
 * @returns The transaction context.
 */
export const TransactionContext = createContext<TransactionContextType>({
  id: "",
  amount: "",
  balance: 0,
  date: "",
  description: "",
  setAmount: () => {},
  setDate: () => {},
  setDescription: () => {},
  setTransactionId: () => {},
  setBalance: () => {},
});

interface TransactionContextProviderProps {
  children: ReactNode;
}

export const TransactionContextProvider = ({
  children,
}: TransactionContextProviderProps) => {
  const [state, dispatch] = useReducer<React.Reducer<TransactionState, Action>>(
    transactionReducer,
    {
      id: "",
      amount: "",
      balance: 0,
      date: "",
      description: "",
    }
  );

  const setAmount = (amount: string) => dispatch({ type: "Amount", amount });
  const setDate = (date: string) => dispatch({ type: "Date", date });
  const setDescription = (description: string) =>
    dispatch({ type: "Description", description });
  const setTransactionId = (id: string) => dispatch({ type: "Id", id });
  const setBalance = (balance: number) =>
    dispatch({ type: "Balance", balance });

  const ctxValue: TransactionContextType = {
    ...state,
    setAmount,
    setDate,
    setDescription,
    setTransactionId,
    setBalance,
  };

  return (
    <TransactionContext.Provider value={ctxValue}>
      {children}
    </TransactionContext.Provider>
  );
};
