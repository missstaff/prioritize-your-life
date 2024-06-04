import React, { useContext, useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { router } from "expo-router";
import AppThemedLink from "@/components/app_components/AppThemedLink";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppTouchableOpacity from "@/components/app_components/AppTouchableOpacity";
import { AppContext } from "@/store/app-context";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { getFireApp } from "@/getFireApp";
import { isValidEmail } from "./utilities";

export default function ResetPassword() {
  const { isAuthenticated } = useContext(AppContext);
  const [email, setEmail] = useState<string>("");
  
  if (isAuthenticated) {
    router.push("/");
  }

  const onSubmit = () => {
    try {
      if (!isValidEmail(email)) {
        alert("Invalid email address. Please try again.");
        return;
      }
      const firebase = getFireApp();
      if (!firebase) throw new Error("Firebase app not initialized");
      if (!("auth" in firebase))
        throw new Error("Firebase app does not have 'auth' property");
      firebase.auth().sendPasswordResetEmail(email);
      alert("Password reset email sent.");
      setEmail("");
      router.push("/signin");
    } catch (error: any) {
      const errorMessage =
        "Error resetting password: " +
        (error.message ?? "Unknown error occurred.");
      console.error(errorMessage + "\nStackTrace: " + error.stack);
      alert(errorMessage);
    }
  };
  return (
    <AppThemedView style={styles.container}>
      <AppThemedTextInput
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

      <AppThemedLink to="./signin">Sign In</AppThemedLink>
    </AppThemedView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
