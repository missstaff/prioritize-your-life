import React, { useContext, useState } from "react";
import Toast from "react-native-toast-message";
import { Tabs } from "expo-router";
import { ms, s, ScaledSheet } from "react-native-size-matters";
import AppModal from "@/components/modal/Modal";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { AuthContext } from "@/store/auth-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { COLORS, COLORTHEME } from "@/constants/Colors";
import { getFireApp } from "@/getFireApp";


/**
 * Renders the layout for the tabs in the app.
 *
 * @returns The JSX element representing the tab layout.
 */
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, setIsAuthenticated, setUid } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);

  const logout = async () => {
    const firebase = await getFireApp();
    if (!firebase) {
      Toast.show({
        type: "error",
        text1: "There has been an error. Please try again.",
      });
      throw new Error("Firebase app not initialized");
    }

     await firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("User signed out");
        setIsVisible(false);
        setIsAuthenticated(false);
        setUid("");
      });
  }

  return (
    <>
      <AppModal
        onClose={() => setIsVisible(false)}
        visible={isVisible}
      >
        <AppThemedText style={styles.modalTitle}>Settings</AppThemedText>
        <AppThemedText type="link" onPress={() => logout()} >Logout</AppThemedText>
        <AppThemedText type="link" onPress={() => setIsVisible(false)}>
          Close
        </AppThemedText>
      </AppModal>
      <Tabs
        screenOptions={{
          tabBarInactiveTintColor: COLORTHEME[colorScheme ?? "light"].tint,
          tabBarActiveTintColor: COLORS.primary,
          headerShown: true,
          headerTitleAlign: "center",
          headerShadowVisible: true,
          tabBarStyle: {
            display: isAuthenticated ? "flex" : "none",
          },

          headerRight: () => (
            <TabBarIcon
              name="settings"
              color="gray"
              size={24}
              onPress={() => setIsVisible(true)}
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
            title: "Plan",
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
    marginBottom: ms(20),
  },
});

