import { FlatList } from "react-native";
import ListItem from "./ListItem";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner";
import OnError from "../navigation/OnError";

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

    if(isError) {
      return <OnError error={error} />;
    }

    if(isPending || isLoading || isFetching) {
      return <LoadingSpinner />;
    }
    
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
