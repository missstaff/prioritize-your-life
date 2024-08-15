import { TransactionState } from "@/store/transaction-reducer";
// import { UseMutationResult } from "@tanstack/react-query";

export interface HandleResetPasswordProps {
  email: string;
}

export interface IsValidProps {
  isValid: boolean;
  message: string;
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

export interface SignUpProps extends SignInProps {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ToasterProps {
  type: string;
  text1: string;
  text2?: string;
  title: string;
}

export interface TransactionProps {
  amount: string;
  balance: number;
  date: Date;
  description: string;
  id: string;
}

export interface TransactionModalContentProps {
  data: TransactionState[] | undefined;
  selectedTab: string;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}
// mutation: UseMutationResult<void, Error, void, unknown>;
