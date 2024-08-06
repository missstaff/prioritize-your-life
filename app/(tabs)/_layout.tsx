import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { AppContext } from "@/store/app-context";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { COLORS, COLORTHEME } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AppModal from "@/components/modal/Modal";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import { getFireApp } from "@/getFireApp";
import Toast from "react-native-toast-message";

/**
 * Renders the layout for the tabs in the app.
 *
 * @returns The JSX element representing the tab layout.
 */
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, setIsAuthenticated, setUid } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);

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
        setModalVisible(false);
        setIsAuthenticated(false);
        setUid("");
      });
  }

  return (
    <>
      <AppModal
        onClose={() => setModalVisible(false)}
        visible={modalVisible}
      >
        <AppThemedText style={styles.modalTitle}>Settings</AppThemedText>
        <AppThemedText type="link" onPress={logout} >Logout</AppThemedText>
        <AppThemedText type="link" onPress={() => setModalVisible(false)}>
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
              onPress={() => setModalVisible(true)}
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
          name="balance"
          options={{
            title: "Balance",
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
    fontWeight: "bold",
    marginBottom: 20,
  },
});
