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
  date: string;
  description: string;
  amount: number;
};
