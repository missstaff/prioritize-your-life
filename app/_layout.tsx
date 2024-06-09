import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import { Stack, useNavigationContainerRef } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";
import { AppContextProvider } from "@/store/app-context";
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { useColorScheme } from "@/hooks/useColorScheme";
import { AppState, AppStateStatus, Platform } from "react-native";
import { onlineManager } from '@tanstack/react-query'
import NetInfo from '@react-native-community/netinfo'

export {
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "./index",
};


function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

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

function RootLayoutNav() {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  useReactQueryDevTools(queryClient);

  useEffect(() => {
     onlineManager.setEventListener((setOnline) => {
        return NetInfo.addEventListener((state) => {
          setOnline(!!state.isConnected)
        })
      })
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)
  
    return () => subscription.remove()
  }, [])


  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
          <StatusBar style={"auto"} />
          <Toast />
        </ThemeProvider>
      </AppContextProvider>
    </QueryClientProvider>
  );
}
