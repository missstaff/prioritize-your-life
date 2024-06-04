import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import AppLink from "@/components/AppLink";
import AppTouchableOpacity from "@/components/AppTouchableOpacity";
import { isValidEmail } from "./utilities";
import AppTextInput from "@/components/AppTextInput";
import { getFireApp } from "@/getFireApp";
import { router } from "expo-router";

export default function ResetPassword() {
  const [email, setEmail] = useState<string>("");
  const onSubmit = () => {
    try {
        if (!isValidEmail(email)) {
            alert("Invalid email address. Please try again.");
            return;
        }
        const firebase = getFireApp();
        if (!firebase) throw new Error("Firebase app not initialized");
        if (!("auth" in firebase)) throw new Error("Firebase app does not have 'auth' property");
        firebase.auth().sendPasswordResetEmail(email);
        alert("Password reset email sent.");
        router.push("/signin");
    }catch(error: any) {
        const errorMessage = "Error resetting password: " + (error.message ?? "Unknown error occurred.");
        console.error(errorMessage + "\nStackTrace: " + error.stack);
        alert(errorMessage);
    }
  };
  return (
    <ThemedView style={styles.container}>
      <AppTextInput
        checkValue={isValidEmail}
        icon="email"
        placeholder="Email"
        secureEntry={false}
        setValue={setEmail}
        value={email}
      />
      <AppTouchableOpacity onPress={onSubmit}>
        Reset Password
      </AppTouchableOpacity>

      <AppLink to="./signin">Sign In</AppLink>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
