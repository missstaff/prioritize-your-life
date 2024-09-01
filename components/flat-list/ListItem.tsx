import { Pressable } from "react-native";
import ShowIf from "../ShowIf";
import GoalItem from "./GoalItem";
import TransactionItem from "./TransactionItem";
import { useContext } from "react";
import { AppContext } from "@/store/app/app-context";

interface ListItemProps {
  item: {
    amount?: string;
    currentBalance?: number;
    date?: string;
    description?: string;
    name: string;
    progress?: number;
    isLongTerm?: boolean;
  };
  onPress: (item: any) => void;
}

const ListItem = ({ item, onPress }: ListItemProps) => {
  const appCtx = useContext(AppContext);
  const { selectedTab } = appCtx;
  return (
    <ShowIf
      condition={item !== null}
      render={
        <Pressable
          onPress={() => onPress(item)}
        >
          <ShowIf
            condition={item.currentBalance !== undefined}
            render={<GoalItem item={item} />}
            renderElse={<TransactionItem item={item} />}
          />
        </Pressable>}
    />
  );
};

export default ListItem;
