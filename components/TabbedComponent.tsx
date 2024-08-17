import { Pressable } from "react-native";
import { ScaledSheet, s, vs } from "react-native-size-matters";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import { AppThemedView } from "./app_components/AppThemedView";
import { COLORS } from "@/constants/Colors";

interface TabbedComponentProps {
  children: React.ReactNode[];
  selectedTab: number;
  tabs: string[];
  setSelectedTab: (selectedTab: number) => void;
}

/**
 * TabbedComponent is a component that displays a set of tabs and allows the user to switch between them.
 * @param {TabbedComponentProps} props - The props for the TabbedComponent.
 * @param {React.ReactNode[]} props.children - The content to be displayed for each tab.
 * @param {number} props.selectedTab - The index of the currently selected tab.
 * @param {Function} props.setSelectedTab - A function to set the selected tab.
 * @param {string[]} props.tabs - An array of tab labels.
 * @returns {JSX.Element} The rendered TabbedComponent.
 */
const TabbedComponent: React.FC<TabbedComponentProps> = ({
  children,
  selectedTab,
  setSelectedTab,
  tabs,
}) => {
  return (
    <>
      <AppThemedView style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <Pressable key={index} onPress={() => setSelectedTab(index)}>
            <AppThemedText
              style={[selectedTab === index && styles.selectedTab, styles.tab]}
            >
              {tab}
            </AppThemedText>
          </Pressable>
        ))}
      </AppThemedView>
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
