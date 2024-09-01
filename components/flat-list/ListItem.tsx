import { Pressable } from "react-native";
import { s, ScaledSheet } from "react-native-size-matters";
import AppThemedText from "../app_components/AppThemedText";
import Row from "../grid/Row";
import Column from "../grid/Column";
import { truncateString } from "@/app/(tabs)/utilities/transactions-utilities";
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
