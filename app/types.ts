import { GoalTransactionState } from "@/store/goals/goal-reducer";
import { TransactionState } from "@/store/transaction/transaction-reducer";
import { Timestamp } from "@react-native-firebase/firestore";

export interface GoalProps {
  id: string;
  currentBalance: number; 
  pledge?: number; 
  description: string; 
  expectedEndDate: Timestamp; 
  goal: number; 
  howOften?: string; 
  isLongTerm: boolean; 
  lastTransactionDate: Timestamp; 
  name: string; 
  startDate: Timestamp; 
  startingBalance: number;
  transactions: GoalTransactionState[]; 
}
export interface IsValidProps {
  isValid: boolean;
  message: string;
}

export interface ResetPasswordProps {
  email: string;
}

export interface RootStackParamList {
  index: undefined;
  login: undefined;
  signup: undefined;
  reset: undefined;
  auth: undefined;
}

export interface SignInProps {
  email: string;
  password: string;
}

export interface SignUpProps {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface TransactionModalContentProps {
  data: TransactionState[] | undefined;
  selectedTab: string;
  setIsVisible: (isVisible: boolean) => void;
  refetch: () => void;
}

export interface TransactionProps {
  amount: string;
  balance: number;
  date: Date;
  description: string;
  id: string;
}

// import { UseMutationResult } from "@tanstack/react-query";
// mutation: UseMutationResult<void, Error, void, unknown>;
