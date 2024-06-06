import React from "react";
import { Stack } from "expo-router";


/**
 * Renders the tab layout component.
 * This component displays a stack of screens for signing in, signing up, and resetting password.
 */
export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="signin"
        options={{
          title: "SignIn"
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "SignUp",
        }}
      />
      <Stack.Screen
        name="reset"
        options={{
          title: "ResetPassword",
        }}
      />
    </Stack>
  );
}
