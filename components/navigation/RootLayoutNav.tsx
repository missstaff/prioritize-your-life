import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from "@tanstack/react-query";
import { Stack, useNavigationContainerRef } from "expo-router";
import { useEffect } from "react";
import {
  AppState,
  AppStateStatus,
  Platform,
  useColorScheme,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { AuthContextProvider } from "@/store/auth-context";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { TransactionContextProvider } from "@/store/transaction-context";

// This function is called when the app state changes.
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

/**
 * RootLayoutNav component renders the root layout of the navigation in the finance app.
 * It sets up the necessary providers and configurations for React Navigation, React Query, and other dependencies.
 * It also handles app state changes and online/offline status using NetInfo.
 */
export default function RootLayoutNav() {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  useReactQueryDevTools(queryClient);

  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected);
      });
    });
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <TransactionContextProvider>
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
        </TransactionContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
