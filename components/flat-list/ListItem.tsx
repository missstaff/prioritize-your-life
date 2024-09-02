import { Pressable } from "react-native";
import GoalItem from "./GoalItem";
import ShowIf from "../ShowIf";
import TransactionItem from "./TransactionItem";

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
            render={<GoalItem item={item} />}
            renderElse={<TransactionItem item={item} />}
          />
        </Pressable>
      }
    />
  );
};

export default ListItem;
