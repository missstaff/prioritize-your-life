import React, { useContext, useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import LoadingSpinner from "@/components/LoadingSpinner";
import ShowIf from "@/components/ShowIf";
import { AuthContext } from "@/store/auth-context";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { isValidEmail, isValidPassword } from "./utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import { styles } from "./styles";
import { handleSignUp } from "./apis/api";

export default function SignUp(): JSX.Element {
  const queryClient = useQueryClient();
  const { setIsAuthenticated, setUid } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const mutation = useMutation({
    mutationFn: handleSignUp,
    onSuccess: (uid) => {
      if (uid) {
        setUid(uid);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsAuthenticated(true);
        router.push("/");
      }
      queryClient.invalidateQueries({ queryKey: ["uid"] });
    },
    onError: (error: unknown) => {
      if (typeof error === "string") {
        console.error("Error signing up: " + error);
      } else if (error instanceof Error) {
        const errorMessage =
          "Error signing up:" + (error.message ?? "Unknown error occurred");
        console.error(errorMessage + "\nStackTrace: " + error);
      }

      Toast.show({
        type: "error",
        text1: "Error signing up",
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
              checkValue={isValidEmail}
              iconName="mail"
              placeholder="Email"
              secureEntry={false}
              setValue={setEmail}
              value={email}
            />
            <AppThemedTextInput
              checkValue={isValidPassword}
              placeholder="Password"
              secureEntry={true}
              setValue={setPassword}
              value={password}
            />
            <AppThemedTextInput
              checkValue={isValidPassword}
              placeholder="Confirm Password"
              secureEntry={true}
              setValue={setConfirmPassword}
              value={confirmPassword}
            />
            <AppThemedTouchableOpacity
              disabled={mutation.status === "pending"}
              onPress={() =>
                mutation.mutate({ email, confirmPassword, password })
              }
            >
              Sign Up
            </AppThemedTouchableOpacity>
            <AppThemedText type="link" onPress={() => router.push("/")}>
              Sign In
            </AppThemedText>
          </>
        }
      />
    </AppThemedView>
  );
}
