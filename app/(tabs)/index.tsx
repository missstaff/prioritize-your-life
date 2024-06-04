import React, { useContext, useState } from "react";  
import { Image, StyleSheet, Platform } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import SignIn from "../(auth)/signin";
import { AppContext } from "../../store/app-context";


export default function HomeScreen() {

  const { isAuthenticated } = useContext(AppContext);

  if(!isAuthenticated){
    return (
      <SignIn />
    );
  }
  return (
      <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }>
      <AppThemedView style={styles.titleContainer}>
        <AppThemedText type="title">Welcome!</AppThemedText>
        <HelloWave />
      </AppThemedView>
      <AppThemedView style={styles.stepContainer}>
        <AppThemedText type="subtitle">Step 1: Try it</AppThemedText>
        <AppThemedText>
          Edit <AppThemedText type="defaultSemiBold">app/(tabs)/index.tsx</AppThemedText> to see changes.
          Press{" "}
          <AppThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </AppThemedText>{" "}
          to open developer tools.
        </AppThemedText>
      </AppThemedView>
      <AppThemedView style={styles.stepContainer}>
        <AppThemedText type="subtitle">Step 2: Explore</AppThemedText>
        <AppThemedText>
          Tap the Explore tab to learn more about what"s included in this starter app.
        </AppThemedText>
      </AppThemedView>
      <AppThemedView style={styles.stepContainer}>
        <AppThemedText type="subtitle">Step 3: Get a fresh start</AppThemedText>
        <AppThemedText>
          When you"re ready, run{" "}
          <AppThemedText type="defaultSemiBold">npm run reset-project</AppThemedText> to get a fresh{" "}
          <AppThemedText type="defaultSemiBold">app</AppThemedText> directory. This will move the current{" "}
          <AppThemedText type="defaultSemiBold">app</AppThemedText> to{" "}
          <AppThemedText type="defaultSemiBold">app-example</AppThemedText>.
        </AppThemedText>
      </AppThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
