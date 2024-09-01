import React, { useContext, useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import AppThemedView  from "@/components/app_components/AppThemedView";
import LoadingSpinner from "@/components/LoadingSpinner";
import ShowIf from "@/components/ShowIf";
import { AuthContext } from "@/store/auth/auth-context";
import { handleSignIn } from "./apis/api";
import { isValidEmail, isValidPassword } from "./utilities";
import { styles } from "./styles";

/**
 * SignIn component.
 *
 * This component is responsible for rendering the sign in functionality.
 * It allows the user to enter their email and password to sign in.
 *
 * @returns JSX.Element
 */
export default function SignIn(): JSX.Element {
  const { setIsAuthenticated, setUid } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const mutation = useMutation({
    mutationFn: handleSignIn,
    onSuccess: (uid) => {
      if (uid) {
        setUid(uid);
        setEmail("");
        setPassword("");
        setIsAuthenticated(true);
        router.push("/(tabs)");
      }
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
    <AppThemedView style={styles.container}>
      <ShowIf
        condition={mutation.status === "pending"}
        render={<LoadingSpinner />}
        renderElse={
          <>
            <AppThemedTextInput
              iconName="mail"
              keyboardType="default"
              placeholder="Email"
              secureEntry={false}
              value={email}
              checkValue={isValidEmail}
              setValue={setEmail}
            />
            <AppThemedTextInput
              keyboardType="default"
              placeholder="Password"
              secureEntry={true}
              value={password}
              checkValue={isValidPassword}
              setValue={setPassword}
            />
            <AppThemedTouchableOpacity
              disabled={mutation.status === "pending"}
              onPress={() => mutation.mutate({ email, password })}
            >
              Sign In
            </AppThemedTouchableOpacity>
            <AppThemedText type="link" onPress={() => router.push("/signup")}>
              Sign Up
            </AppThemedText>
            <AppThemedText type="link" onPress={() => router.push("/reset")}>
              Reset Password
            </AppThemedText>
          </>
        }
      />
    </AppThemedView>
  );
}
