import React, { createContext, useReducer, ReactNode, useContext } from "react";
import { transactionReducer, TransactionState, Action } from "./transaction-reducer";


export interface TransactionContextType extends TransactionState {
  setAmount: (amount: string) => void;
  setDate: (date: string) => void;
  setDescription: (description: string) => void;
  setTransactionId: (id: string) => void;
  setBalance: (balance: number) => void;
}


export const TransactionContext = createContext<TransactionContextType>({
  id: '',
  amount: '',
  balance: 0,
  date: "",
  description: '',
  setAmount: () => {},
  setDate: () => {},
  setDescription: () => {},
  setTransactionId: () => {},
  setBalance: () => {},
});

interface TransactionContextProviderProps {
  children: ReactNode;
}


export const TransactionContextProvider = ({ children }: TransactionContextProviderProps) => {
  const [state, dispatch] = useReducer<React.Reducer<TransactionState, Action>>(
    transactionReducer,
    {
      id: '',
      amount: '',
      balance: 0,
      date: "",
      description: '',
    }
  );

  const setAmount = (amount: string) => dispatch({ type: 'Amount', amount });
  const setDate = (date: string) => dispatch({ type: 'Date', date });
  const setDescription = (description: string) => dispatch({ type: 'Description', description });
  const setTransactionId = (id: string) => dispatch({ type: 'Id', id });
  const setBalance = (balance: number) => dispatch({ type: 'Balance', balance });

  const ctxValue: TransactionContextType = {
    ...state,
    setAmount,
    setDate,
    setDescription,
    setTransactionId,
    setBalance,
  };

  return <TransactionContext.Provider value={ctxValue}>{children}</TransactionContext.Provider>;
};
