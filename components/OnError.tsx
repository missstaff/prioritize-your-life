import { router } from "expo-router";
import { ScaledSheet } from "react-native-size-matters";
import AppThemedText from "./app_components/AppThemedText";
import AppThemedView from "./app_components/AppThemedView";

export default function OnError(error: any) {
  return (
    <AppThemedView style={{}}>
      <AppThemedText>Error: {error.message}</AppThemedText>
      <AppThemedText
        style={styles.text}
        type="link"
        onPress={() => router.push("/")}
      >
        Home
      </AppThemedText>
    </AppThemedView>
  );
}

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    //flexGrow:1,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    fontSize: "16@s",
    textAlign: "center",
  },
});