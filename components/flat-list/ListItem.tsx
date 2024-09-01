import { Pressable } from "react-native";
import ShowIf from "../ShowIf";
import GoalItem from "./GoalItem";
import TransactionItem from "./TransactionItem";

interface ListItemProps {
  item: {
    amount?: string;
    currentBalance?: number;
    date?: string;
    description?: string;
    name: string;
    progress?: number;
  };
  onPress: (item: any) => void;
}

const ListItem = ({ item, onPress }: ListItemProps) => {
  return (
    item && (
      <Pressable
        onPress={() => onPress(item)}
      >
        <ShowIf
          condition={item.currentBalance !== undefined}
          render={<GoalItem item={item} />}
          renderElse={<TransactionItem item={item} />}
        />
      </Pressable>
    )
  );
};

export default ListItem;
