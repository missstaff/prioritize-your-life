import { s, ScaledSheet, vs } from "react-native-size-matters";
import AppThemedText from "../../app_components/AppThemedText";
import Column from "../../grid/Column";
import Row from "../../grid/Row";
import ShowIf from "@/components/ShowIf";
import { truncateString } from "@/app/(auth)/(tabs)/utilities/transactions-utilities";
import { ListItemProps } from "@/app/types";
import { ProgressBar } from "@react-native-community/progress-bar-android";
import { COLORS } from "@/constants/Colors";
import { View } from "react-native";

const GoalListItem = ({ item }: ListItemProps) => {
  return (
    <ShowIf
      condition={!item.complete}
      render={
        <Row
          style={{
            justifyContent: "space-between",
            paddingBottom: s(10),
          }}
        >
          <Column colStyles={{ width: "33%" }}>
            <View>
              <AppThemedText style={styles.text}>
                {truncateString(item.name)}
              </AppThemedText>
            </View>
          </Column>
          <Column colStyles={{ width: "33%" }}>
            <View>
              <AppThemedText style={styles.text}>
                ${item.currentBalance?.toFixed(2)}
              </AppThemedText>
            </View>
          </Column>
          <Column colStyles={{ width: "33%", paddingLeft: 25 }}>
            <View>
              <AppThemedText style={styles.text}>
                {item.progress?.toFixed(0)}%
              </AppThemedText>
              <ProgressBar
                styleAttr="Horizontal"
                indeterminate={false}
                color={COLORS.primary}
                progress={
                  item && item.progress
                    ? parseFloat((item?.progress / 100).toFixed(2))
                    : 0
                }
              />
            </View>
          </Column>
        </Row>
      }
    />
  );
};

const styles = ScaledSheet.create({
  text: {
    fontSize: s(12),
  },
});

export default GoalListItem;
