import React, { useContext, useState } from "react";
import { StyleSheet, Button } from "react-native";
import { Tabs } from "expo-router";
import { AppContext } from "@/store/app-context";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import SettingsModal from "@/components/Modal";
import { AppThemedText } from "@/components/app_components/AppThemedText";

/**
 * Renders the layout for the tabs in the app.
 *
 * @returns The JSX element representing the tab layout.
 */
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
       <SettingsModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <AppThemedText style={styles.modalTitle}>Settings</AppThemedText>
        <Button title="Close" onPress={() => setModalVisible(false)} />
        {/* Add any other settings content here */}
      </SettingsModal>
      <Tabs
        screenOptions={{
          tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tint,
          tabBarActiveTintColor: "#CD03EF",
          headerShown: true,
          headerTitleAlign: "center",
          headerShadowVisible: true,
          tabBarStyle: {
            display: isAuthenticated ? "flex" : "none",
          },

          headerRight: () => (
            <TabBarIcon name="settings" color="gray" size={24} onPress={() => setModalVisible(true)} />
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
          name="balances"
          options={{
            title: "Balances",
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

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
