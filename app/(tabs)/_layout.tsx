import React, { useContext, useState } from "react";
import Toast from "react-native-toast-message";
import { Tabs } from "expo-router";
import { s, ScaledSheet } from "react-native-size-matters";
import { useMutation } from "@tanstack/react-query";
import AppModal from "@/components/modal/Modal";
import ShowIf from "@/components/ShowIf";
import AppThemedText from "@/components/app_components/AppThemedText";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { AuthContext } from "@/store/auth/auth-context";
import { logout } from "../(auth)/apis/api";
import { useColorScheme } from "@/hooks/useColorScheme";
import { COLORS, COLORTHEME } from "@/constants/Colors";


/**
 * Renders the layout for the tabs in the app.
 *
 * @returns The JSX element representing the tab layout.
 */
export default function TabLayout(): JSX.Element {
  const colorScheme = useColorScheme();
  const { isAuthenticated, setIsAuthenticated, setUid } =
    useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);

  const mutation = useMutation({
    mutationFn: () => logout(setIsVisible, setIsAuthenticated, setUid),
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error.message,
        text2: "Please try again.",
      });
    },
  });

  return (
    <>
      <AppModal onClose={() => setIsVisible(false)} visible={isVisible}>
        <AppThemedText style={styles.modalTitle}>Settings</AppThemedText>
        <AppThemedText
          type="link"
          onPress={() => logout(setIsVisible, setIsAuthenticated, setUid)}
        >
          Logout
        </AppThemedText>
        <AppThemedText type="link" onPress={() => setIsVisible(false)}>
          Close
        </AppThemedText>
      </AppModal>
      <Tabs
        screenOptions={{
          tabBarInactiveTintColor: COLORTHEME[colorScheme ?? "light"].tint,
          tabBarActiveTintColor: COLORS.primary,
          headerShown: isAuthenticated ? true : false,
          headerTitleAlign: "center",
          headerShadowVisible: true,
          tabBarStyle: {
            display: isAuthenticated ? "flex" : "none",
          },
          headerTitle: "",

          headerRight: () => (
            <ShowIf 
              condition={isAuthenticated}
              render={
                <TabBarIcon
                  name="settings"
                  color={COLORTHEME[colorScheme ?? "light"].tint}
                  onPress={() => setIsVisible(true)}
                />
              }
            />
          ),

          headerRightContainerStyle: {
            paddingRight: 20,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="transactions"
          options={{
            title: "Transactions",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "cash" : "cash-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="track"
          options={{
            title: "Track",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "bar-chart" : "bar-chart-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="budget"
          options={{
            title: "Budget",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "calendar" : "calendar-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="save"
          options={{
            title: "Save",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "wallet" : "wallet-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = ScaledSheet.create({
  modalTitle: {
    fontSize: s(20),
    fontWeight: "bold",
  },
});
