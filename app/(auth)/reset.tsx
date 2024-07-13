import React, { useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import LoadingSpinner from "@/components/LoadingSpinner";
import ShowIf from "@/components/ShowIf";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import { AppThemedView } from "@/components/app_components/AppThemedView"
import { getFireApp } from "@/getFireApp";
import { isValidEmail } from "./utilities";
import { styles } from "./styles";


/**
 * A component that renders a password reset form.
 */
export default function ResetPassword() {
  const [email, setEmail] = useState<string>("");


  const resetPassword = async () => {
    const emailToLowerCase = email.toLocaleLowerCase();
    if (!isValidEmail(emailToLowerCase)) {
      return;
    }
    const firebase = await getFireApp();
    if (!firebase) {
      throw new Error("Firebase app not initialized");
    }
    if (!("auth" in firebase)) {
      throw new Error("Firebase app does not have 'auth' property");
    }

    await firebase.auth().sendPasswordResetEmail(emailToLowerCase);
  };

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Password reset email sent.",
      });
      router.push("/signin");
      setEmail("");
    },
    onError: (error: any) => {
      const errorMessage =
        "Error resetting password: " +
        (error.message ?? "Unknown error occurred.");
      console.error(errorMessage + "\nStackTrace: " + error.stack);
      Toast.show({
        type: "error",
        text1: "Error resetting password",
        text2: "Please try again.",
      });
    },
  });

  return (
    <ShowIf
      condition={mutation.status === "pending"}
      render={
        <AppThemedView style={styles.container}>
          <LoadingSpinner />
        </AppThemedView>
      }
      renderElse={
        <AppThemedView style={styles.container}>
          <AppThemedTextInput
            checkValue={isValidEmail}
            iconName="mail"
            placeholder="Email"
            secureEntry={false}
            setValue={setEmail}
            value={email}
          />
          <AppThemedTouchableOpacity disabled={!isValidEmail} onPress={() => mutation.mutate()}>
            Reset Password
          </AppThemedTouchableOpacity>
          <AppThemedText
            type="link"
            onPress={() => router.push("/signup")}
          ></AppThemedText>
        </AppThemedView>
      }
    />
  );
}
