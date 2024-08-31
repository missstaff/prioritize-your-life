import { Timestamp } from "@google-cloud/firestore";

export interface GoalTransactionState {
  id: number;
  amount: number;
  balance: number;
  date: Timestamp;
}

export interface GoalState {
  id: string;
  currentBalance: number; //calculated
  pledge?: string; //optional and not in initial modal
  description: string; 
  expectedEndDate: string; 
  goal: string; 
  howOften?: string; //optional and not in initial modal
  isLongTerm: boolean; //set based on tab
  lastTransactionDate: string; //calculated-eish!
  name: string; 
  startDate: string; // editable but will populate as the day created in the app
  startingBalance: string
  transactions: GoalTransactionState[]; //this is where new transactions will be added ??
}

export type Action =
  | { type: "Id"; id: string }
  | { type: "CurrentBalance"; currentBalance: number }
  | { type: "Pledge"; pledge: string }
  | { type: "Description"; description: string }
  | { type: "ExpectedEndDate"; expectedEndDate: string }
  | { type: "Goal"; goal: string }
  | { type: "HowOften"; howOften: string }
  | { type: "IsLongTerm"; isLongTerm: boolean }
  | { type: "LastTransactionDate"; lastTransactionDate: string }
  | { type: "Name"; name: string }
  | { type: "StartDate"; startDate: string }
  | { type: "StartingBalance"; startingBalance: string }
  | { type: "Transactions"; transactions: GoalTransactionState[] };

export const goalReducer = (state: GoalState, action: Action): GoalState => {
  switch (action.type) {
    case "Id":
      return { ...state, id: action.id };
    case "CurrentBalance":
      return { ...state, currentBalance: action.currentBalance };
    case "Pledge":
      return { ...state, pledge: action.pledge };
    case "Description":
      return { ...state, description: action.description };
    case "ExpectedEndDate":
      return { ...state, expectedEndDate: action.expectedEndDate };
    case "Goal":
      return { ...state, goal: action.goal };
    case "HowOften":
      return { ...state, howOften: action.howOften };
    case "IsLongTerm":
      return { ...state, isLongTerm: action.isLongTerm };
    case "LastTransactionDate":
      return { ...state, lastTransactionDate: action.lastTransactionDate };
    case "Name":
      return { ...state, name: action.name };
    case "StartDate":
      return { ...state, startDate: action.startDate };
    case "StartingBalance":
      return { ...state, startingBalance: action.startingBalance };
    case "Transactions":
      return { ...state, transactions: action.transactions };
    default:
      return state;
  }
};