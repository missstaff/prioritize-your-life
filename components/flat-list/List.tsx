import { FlatList } from "react-native";
import ListItem from "./ListItem";
import { useQuery } from "@tanstack/react-query";

export interface ListTransactionsProps {
  handleOnPress: (item: any) => void;
  queryKey: string  | string[];
  queryFn: () => Promise<any[]>;
}

export default function ListTransactions({
  handleOnPress,
  queryKey,
  queryFn,
}: ListTransactionsProps) {
  const { refetch, isPending, isError, data, error, isFetching, isLoading } =
    useQuery<any[]>({
      queryKey: [queryKey],
      queryFn: () => queryFn(),
      refetchOnMount: true,
    });
    
  return (
    <FlatList
      scrollEnabled={true}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          onPress={handleOnPress}
        />
      )}
    />
  );
}
