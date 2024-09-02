import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import AppThemedView from "@/components/app_components/AppThemedView";
import LoadingSpinner from "@/components/LoadingSpinner";
import ShowIf from "@/components/ShowIf";
import { handleResetPassword } from "./apis/api";
import { isValidEmail } from "./utilities";
import { styles } from "./styles";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const mutation = useMutation({
    mutationFn: handleResetPassword,
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Password reset email sent.",
      });
      router.push("/");
      setEmail("");
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error.message,
        text2: "Please try again.",
      });
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              iconName="mail"
              keyboardType="default"
              placeholder="Email"
              secureEntry={false}
              value={email}
              checkValue={isValidEmail}
              setValue={setEmail}
            />
            <AppThemedTouchableOpacity
              disabled={!isValidEmail || mutation.status === "pending"}
              onPress={() => mutation.mutate({ email })}
            >
              Reset Password
            </AppThemedTouchableOpacity>
            <AppThemedText onPress={() => router.push("/")} type="link">
              Signin
            </AppThemedText>
          </AppThemedView>
        }
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default ResetPassword;
