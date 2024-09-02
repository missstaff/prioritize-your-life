import { ScaledSheet, vs } from "react-native-size-matters";
import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import AppThemedView from "@/components/app_components/AppThemedView";

interface NoListItemsProps {
  setIsVisible: (isVisible: boolean) => void;
  type: string;
}

const NoListItems = ({ setIsVisible, type }: NoListItemsProps) => {
  return (
    <AppThemedView style={styles.container}>
      <AppThemedText style={styles.text} type="default">
        No Items Found
      </AppThemedText>
      <AppThemedView>
        <AppThemedTouchableOpacity onPress={() => setIsVisible(true)}>
          {`Add ${type}`}
        </AppThemedTouchableOpacity>
      </AppThemedView>
    </AppThemedView>
  );
};

const styles = ScaledSheet.create({
  container: {
    height: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingBottom: vs(10),
  },
});
export default NoListItems;
