import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import LoadingSpinner from "@/components/LoadingSpinner";
import ShowIf from "@/components/ShowIf";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { handleResetPassword } from "./apis/api";
import { isValidEmail } from "./utilities";
import { styles } from "./styles";

/**
 * ResetPassword component.
 *
 * This component is responsible for rendering the reset password functionality.
 * It allows the user to enter their email and reset their password.
 *
 * @returns JSX.Element
 */
export default function ResetPassword() {
  const [email, setEmail] = useState<string>("");
  const mutation = useMutation({
    mutationFn: handleResetPassword,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Password reset email sent.",
      });
      router.push("/signin");
      setEmail("");
    },
    onError: (error:any) => {
      Toast.show({
        type: "error",
        text1: error.message,
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
          <AppThemedTouchableOpacity
            disabled={!isValidEmail || mutation.status === "pending"}
            onPress={() => mutation.mutate({ email })}
          >
            Reset Password
          </AppThemedTouchableOpacity>
          <AppThemedText
            onPress={() => router.push("/signup")}
            type="link"
          ></AppThemedText>
        </AppThemedView>
      }
    />
  );
}
