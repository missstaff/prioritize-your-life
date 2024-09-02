import { Link, Stack } from "expo-router";
import { ScaledSheet, s, vs } from "react-native-size-matters";
import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedView from "@/components/app_components/AppThemedView";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <AppThemedView style={styles.container}>
        <AppThemedText type="title">This screen doesn"t exist.</AppThemedText>
        <Link href="/" style={styles.link}>
          <AppThemedText type="link">Go to home screen!</AppThemedText>
        </Link>
      </AppThemedView>
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: s(20),
  },
  link: {
    marginTop: s(15),
    paddingVertical: vs(15),
  },
});
