import { Pressable } from "react-native";
import GoalListItem from "./GoalListItem";
import ShowIf from "../../ShowIf";
import TransactionListItem from "./TransactionListItem";

interface ListItemProps {
  item: {
    amount?: string;
    currentBalance?: number;
    date?: string;
    description?: string;
    isLongTerm?: boolean;
    name: string;
    progress?: number;
  };
  onPress: (item: any) => void;
}

const ListItem = ({ item, onPress }: ListItemProps) => {
  return (
    <ShowIf
      condition={item !== null}
      render={
        <Pressable onPress={() => onPress(item)}>
          <ShowIf
            condition={item.currentBalance !== undefined}
            render={<GoalListItem item={item} />}
            renderElse={<TransactionListItem item={item} />}
          />
        </Pressable>
      }
    />
  );
};

export default ListItem;
