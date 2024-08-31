import React, { useEffect } from "react";
import Toast from "react-native-toast-message";
import NetInfo from "@react-native-community/netinfo";
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
import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
import { Stack, useNavigationContainerRef } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from "@tanstack/react-query";
import { AuthContextProvider } from "@/store/auth/auth-context";
import { TransactionContextProvider } from "@/store/transaction/transaction-context";
import { AppContextProvider } from "@/store/app/app-context";
import { GoalContextProvider } from "@/store/goals/goal-context";
/**
 * Handles the change in the application state.
 * @param status - The new state of the application.
 */
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}


/**
 * RootLayoutNav component.
 * 
 * This component is responsible for rendering the root layout navigation.
 * It sets up the necessary providers and configures the navigation stack.
 * 
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
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
       <AppContextProvider>
       <TransactionContextProvider>
         <GoalContextProvider>
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
         </GoalContextProvider>
        </TransactionContextProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
