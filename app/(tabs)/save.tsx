import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedView from "@/components/app_components/AppThemedView";
import TabbedComponent from "@/components/TabbedComponent";
import { AppContext } from "@/store/app/app-context";
import { useContext } from "react";
import { ScaledSheet } from "react-native-size-matters";

export default function Save() {
  const appCtx = useContext(AppContext);
  const { selectedTab, setSelectedTab } = appCtx;
  const tabsArr = ["Long Term", "Short Term"];

  // if (isPending || isLoading || isFetching) {
  //   return <LoadingSpinner />;
  // }

  // if (isError) {
  //   return <OnError error={error} />;
  // }
  return (
    <AppThemedView>
      <AppThemedText
        style={{ textAlign: "center", paddingTop: 25 }}
        type="title"
      >
        Save
      </AppThemedText>

      <TabbedComponent
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={tabsArr}
      >
        {tabsArr.map((tab, index) => (
          <AppThemedView key={index}>
            <AppThemedText>{tab}</AppThemedText>
          </AppThemedView>
        ))}
      </TabbedComponent>
    </AppThemedView>
  );
}

const styles = ScaledSheet.create({});
