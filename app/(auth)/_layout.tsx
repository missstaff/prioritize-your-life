import React from "react";
import { Stack } from "expo-router";


/**
 * Renders the tab layout component.
 * This component displays a stack of screens for signing in, signing up, and resetting password.
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,

      }}>
      <Stack.Screen
        name="signin"
        options={{
          title: "Login"
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "Sign Up",
        }}
      />
      <Stack.Screen
        name="reset"
        options={{
          title: "Reset Password",
        }}
      />
    </Stack>
  );
}
