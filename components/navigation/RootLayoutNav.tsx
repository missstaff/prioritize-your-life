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
import { Stack, useNavigationContainerRef } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useReactNavigationDevTools } from "@dev-plugins/react-navigation";
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

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const RootLayoutNav = () => {
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

export default RootLayoutNav;
