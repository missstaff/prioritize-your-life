import { Pressable, View } from "react-native";
import { ScaledSheet, s, vs } from "react-native-size-matters";
import AppThemedText from "@/components/app_components/AppThemedText";
import { COLORS } from "@/constants/Colors";

interface TabbedComponentProps {
  children: React.ReactNode[];
  selectedTab: number;
  tabs: string[];
  setSelectedTab: (selectedTab: number) => void;
}

const TabbedComponent: React.FC<TabbedComponentProps> = ({
  children,
  selectedTab,
  setSelectedTab,
  tabs,
}) => {
  return (
    <>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <Pressable key={index} onPress={() => setSelectedTab(index)}>
            <AppThemedText
              style={[selectedTab === index && styles.selectedTab, styles.tab]}
            >
              {tab}
            </AppThemedText>
          </Pressable>
        ))}
      </View>
      {children[selectedTab]}
    </>
  );
};

const styles = ScaledSheet.create({
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: vs(20),
    width: "100%",
  },
  tab: {
    paddingHorizontal: s(15),
  },
  selectedTab: {
    color: COLORS.primary,
  },
});

export default TabbedComponent;
