import { FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import ListItem from "./item/ListItem";
import LoadingSpinner from "../LoadingSpinner";
import OnError from "../OnError";

export interface ListProps {
  handleOnPress: (item: any) => void;
  queryKey: string | string[];
  queryFn: () => Promise<any[]>;
}

const List = ({ handleOnPress, queryKey, queryFn }: ListProps) => {
  const { refetch, isPending, isError, data, error, isFetching, isLoading } =
    useQuery<any[]>({
      queryKey: [queryKey],
      queryFn: () => queryFn(),
      refetchOnMount: true,
    });

  if (isError) {
    return <OnError error={error} />;
  }

  if (isPending || isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <FlatList
      scrollEnabled={true}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ListItem item={item} onPress={handleOnPress} />
      )}
    />
  );
};

export default List;
