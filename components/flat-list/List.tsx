import { FlatList, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import ListItem from "./item/ListItem";
import LoadingSpinner from "../LoadingSpinner";
import OnError from "../OnError";
import { GoalState } from "@/store/goals/goal-reducer";

export interface ListProps {
  handleOnPress: (item: any) => void;
  queryKey: string | string[];
  queryFn: () => Promise<any[]> | GoalState[];
}

const List = ({ handleOnPress, queryKey, queryFn }: ListProps) => {
  const { refetch, isPending, isError, data, error, isFetching, isLoading } =
    useQuery<any[]>({
      queryKey: [queryKey],
      queryFn: () => queryFn(),
      refetchOnMount: true,
    });

    console.log("Goals Data: ", data);

  if (isError) {
    return <OnError error={error} />;
  }

  if (isPending || isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <FlatList
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <ListItem item={item} onPress={handleOnPress} />
    )}
  />
  );
};

export default List;
