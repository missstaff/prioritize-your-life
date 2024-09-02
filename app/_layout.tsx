import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import RootLayoutNav from "@/components/navigation/RootLayoutNav";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}
