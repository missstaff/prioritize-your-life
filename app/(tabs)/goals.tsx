import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import AppThemedView from "@/components/app_components/AppThemedView";
import AppModal from "@/components/modal/Modal";
import { GoalsModalContent } from "@/components/modal/modal_content/GoalsModalContent";
import ShowIf from "@/components/ShowIf";
import TabbedComponent from "@/components/TabbedComponent";
import { AppContext } from "@/store/app/app-context";
import { useContext, useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import Toast from "react-native-toast-message";

export default function Goals() {
  const appCtx = useContext(AppContext);
  const { selectedTab, setSelectedTab } = appCtx;
  const [isVisible, setIsVisible] = useState(false);
  const tabsArr = ["longTerm", "shortTerm"];

  // if (isPending || isLoading || isFetching) {
  //   return <LoadingSpinner />;
  // }

  // if (isError) {
  //   return <OnError error={error} />;
  // }
  return (
    <AppThemedView
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <AppThemedText
        style={{ textAlign: "center", paddingTop: 25 }}
        type="title"
      >
        Goals
      </AppThemedText>

      <TabbedComponent
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabs={tabsArr}
      >
        {tabsArr.map((tab, index) => (
          <ShowIf
            key={index}
            condition={false}
            render={<AppThemedText>{tab}</AppThemedText>}
            renderElse={
              <AppThemedView
                style={{
                  height: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AppThemedText style={{ paddingBottom: 10 }} type="default">
                  No Goals Found
                </AppThemedText>
                <AppThemedView>
                  <AppThemedTouchableOpacity onPress={() => setIsVisible(true)}>
                    Add Goal
                  </AppThemedTouchableOpacity>
                </AppThemedView>
              </AppThemedView>
            }
          />
        ))}
      </TabbedComponent>

      <ShowIf
        condition={isVisible}
        render={
          <AppModal
            onClose={() => [
              setIsVisible(false),
              // setAmount(""),
              // setDate(""),
              // setDescription(""),
              // setTransactionId(""),
              // refetch(),
            ]}
            visible={isVisible}
          >
            <GoalsModalContent selectedTab={tabsArr[selectedTab]} setIsVisible={setIsVisible} />

            <Toast />
          </AppModal>
        }
      />
    </AppThemedView>
  );
}

const styles = ScaledSheet.create({});
