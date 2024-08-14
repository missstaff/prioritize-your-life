// import React, { createContext, useReducer, ReactNode } from "react";
// import { transactionReducer, TransactionState, Action } from "./transaction-reducer";

// // Define context type
// interface TransactionContextType {
//   transactions: TransactionState[];
//   setTransactions: (action: Action) => void; // Adjust type to accept Action
// }

// // Create context with default values
// export const TransactionContext = createContext<TransactionContextType>({
//   transactions: [],
//   setTransactions: () => {},
// });

// interface TransactionContextProviderProps {
//   children: ReactNode;
// }

// const TransactionContextProvider = ({ children }: TransactionContextProviderProps) => {
//   const [state, dispatch] = useReducer(transactionReducer, [] as TransactionState[]);
  
//   // Function to update the transactions using dispatch
//   const setTransactions = (action: Action) => {
//     dispatch(action);
//   };

//   const ctxValue: TransactionContextType = {
//     transactions: state,
//     setTransactions,
//   };

//   return <TransactionContext.Provider value={ctxValue}>{children}</TransactionContext.Provider>;
// };

// export default TransactionContextProvider;
