import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedView from "@/components/app_components/AppThemedView";
import ShowIf from "@/components/ShowIf";
import TabbedComponent from "@/components/TabbedComponent";
import { AppContext } from "@/store/app/app-context";
import { useContext } from "react";
import { ScaledSheet } from "react-native-size-matters";

export default function Goals() {
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
    <AppThemedView style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%"}}>
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
          <ShowIf
            condition={false}
            render={<AppThemedText>{tab}</AppThemedText>}
            renderElse={
              <AppThemedView style={{height: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <AppThemedText type="default">No Goals Found</AppThemedText>
                <AppThemedText type="link">Add a goal</AppThemedText>
              </AppThemedView>
            } />
        ))}
      </TabbedComponent>
    </AppThemedView>
  );
}

const styles = ScaledSheet.create({});
