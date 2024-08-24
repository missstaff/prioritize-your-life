import React, { useEffect } from "react";
import {
  AppState,
  AppStateStatus,
  Platform,
  useColorScheme,
} from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from "@tanstack/react-query";
import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import { Stack, useNavigationContainerRef } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import NetInfo from "@react-native-community/netinfo";
import { AppContextProvider } from "@/store/app/app-context";
import { AuthContextProvider } from "@/store/auth/auth-context";
import { TransactionContextProvider } from "@/store/transaction/transaction-context";
import { AppThemedView } from "../app_components/AppThemedView";


function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

/**
 * RootLayoutNav component.
 * This component is responsible for rendering the root layout navigation.
 * It sets up the necessary providers and configures the navigation stack.

 * @returns The rendered RootLayoutNav component.
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
    <AppThemedView testID="root-layout-nav">
    <QueryClientProvider 
      client={queryClient}>
      <AuthContextProvider>
        <AppContextProvider>
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
        </AppContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
    </AppThemedView>
  );
}
