import { router } from "expo-router";
import { ScaledSheet } from "react-native-size-matters";
import AppThemedText from "./app_components/AppThemedText";
import AppThemedSafeAreaView from "./app_components/AppThemedSafeAreaView";
import { View } from "react-native";

const OnError = (error: any) => {
  return (
    <AppThemedSafeAreaView>
      <View>
        <AppThemedText>Error: {error.message}</AppThemedText>
        <AppThemedText
          style={styles.text}
          type="link"
          onPress={() => router.push("/")}
        >
          Home
        </AppThemedText>
      </View>
    </AppThemedSafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    fontSize: "16@s",
    textAlign: "center",
  },
});

export default OnError;
