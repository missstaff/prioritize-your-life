import { Pressable } from "react-native";
import { s, ScaledSheet } from "react-native-size-matters";
import AppThemedText from "../app_components/AppThemedText";
import Row from "../grid/Row";
import Column from "../grid/Column";
import { truncateString } from "@/app/(tabs)/utilities/transactions-utilities";
import ShowIf from "../ShowIf";

interface ListItemProps {
  item: {
    amount?: string;
    currentBalance?: number;
    date?: string;
    description?: string;
    name: string;
    progress?: number;
  };
  handleSetItem: (item: any) => void;
  setIsVisible: (isVisible: boolean) => void;
}

const ListItem = ({ item, handleSetItem, setIsVisible }: ListItemProps) => {
  return (
    item && (
      <Pressable
        onPress={() => [
          handleSetItem && handleSetItem(item),
          setIsVisible(true),
        ]}
      >
        <Row>
          <Column>
            <ShowIf
              condition={item.date !== undefined}
              render={
                <AppThemedText style={styles.text}>{item.date}</AppThemedText>
              }
              renderElse={
                <AppThemedText style={styles.text}>{item.name}</AppThemedText>
              }
            />
          </Column>
          <Column>
            <ShowIf
              condition={item.amount !== undefined}
              render={
                <AppThemedText style={styles.text}>{item.amount}</AppThemedText>
              }
              renderElse={
                <AppThemedText style={styles.text}>
                  {item.currentBalance}
                </AppThemedText>
              }
            />
          </Column>
          <Column>
            <ShowIf
              condition={item.progress !== undefined}
              render={
                <AppThemedText style={styles.text}>{item.progress}</AppThemedText>
              }
              renderElse={
                <AppThemedText style={styles.text}>
                  {truncateString(item.description)}
                </AppThemedText>
              }
            />
          </Column>
        </Row>
      </Pressable>
    )
  );
};

const styles = ScaledSheet.create({
  text: {
    fontSize: s(12),
  },
});
export default ListItem;
