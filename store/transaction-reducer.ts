// export interface TransactionState {
//     id: string;
//     date: Date;
//     description: string;
//     amount: string;
//     balance: number;
// }

// export type Action =
//     | { type: "Id"; id: string }
//     | { type: "Amount"; amount: string }
//     | { type: "Balance"; balance: number }
//     | { type: "Date"; date: Date }
//     | { type: "Description"; description: string };

    
//     export function transactionReducer(
//       state: TransactionState[],
//       action: Action & { id?: string } // Ensure the action type includes `id` for update actions
//     ): TransactionState[] {
//       switch (action.type) {
//         case "Id":
//         case "Amount":
//         case "Balance":
//         case "Date":
//         case "Description":
//           return state.map(transaction =>
//             transaction.id === action.id
//               ? {
//                   ...transaction,
//                   ...action, // Spread action properties to update the transaction
//                 }
//               : transaction
//           );
//         default:
//           return state;
//       }
//     }