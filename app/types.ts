import { UseMutationResult } from "@tanstack/react-query";

export interface handleResetPasswordProps {
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

export interface ToasterProps {
  type: string;
  text1: string;
  text2?: string;
  title: string;
}

export interface TransactionProps {
  id: string;
  date: Date;
  description: string;
  amount: string;
  balance: number;
}

export interface TransactionModalContentProps {
  amount: string;
  data: TransactionProps[] | undefined;
  date: string;
  description: string;
  selectedTab: string;
  transactionId: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setTransactionId: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => void;
}
// mutation: UseMutationResult<void, Error, void, unknown>;
