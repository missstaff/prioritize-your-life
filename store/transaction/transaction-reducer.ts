export interface TransactionState {
  id: string;
  amount: string;
  balance: number;
  date: string;
  description: string;
}

export type Action =
  | { type: 'Id'; id: string }
  | { type: 'Amount'; amount: string }
  | { type: 'Balance'; balance: number }
  | { type: 'Date'; date: string }
  | { type: 'Description'; description: string }

export const transactionReducer = (state: TransactionState, action: Action): TransactionState => {
  switch (action.type) {
    case 'Id':
      return { ...state, id: action.id };
    case 'Amount':
      return { ...state, amount: action.amount };
    case 'Balance':
      return { ...state, balance: action.balance };
    case 'Date':
      return { 
        ...state, 
        date: action.date };
    case 'Description':
      return { ...state, description: action.description };
    default:
      return state;
  }
};