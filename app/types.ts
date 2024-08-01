import { UseMutationResult } from "@tanstack/react-query";

export type RootStackParamList = {
  index: undefined;
  login: undefined;
  signup: undefined;
  reset: undefined;
  auth: undefined;
};

export interface ToasterProps {
  type: string;
  text1: string;
  text2?: string;
  title: string;
};

export interface TransactionProps {
  id: string;
  date: Date;
  description: string;
  amount: string;
};

export interface TransactionModalContentProps {
  amount: string;
  date: string;
  description: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  mutation: UseMutationResult<void, Error, void, unknown>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
