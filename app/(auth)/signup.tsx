import React, { useContext, useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import LoadingSpinner from "@/components/LoadingSpinner";
import ShowIf from "@/components/ShowIf";
import { AuthContext } from "@/store/app-context";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { getFireApp } from "@/getFireApp";
import { isValidEmail, validateFormInput, isValidPassword } from "./utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import { styles } from "./styles";

export default function SignUp(): JSX.Element {
  const queryClient = useQueryClient();
  const { setIsAuthenticated, setUid } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const signUp = async () => {
    const emailToLowerCase = email.toLocaleLowerCase();
    if (!validateFormInput(emailToLowerCase, password, confirmPassword)) {
      return;
    }

    const firebase = await getFireApp();
    if (!firebase) {
      Toast.show({
        type: "error",
        text1: "There has been an error.",
        text2: "Please try again.",
      });
      console.error("Firebase app not initialized");
      throw new Error("Firebase app not initialized");
    }

    const userCreds = await firebase
      .auth()
      .createUserWithEmailAndPassword(emailToLowerCase, password);

    if (userCreds) {
      setIsAuthenticated(true);
      router.push("/");
      return userCreds.user.uid;
    } else {
      Toast.show({
        type: "error",
        text1: "User not found.",
      });
    }
  };

  const callUseMutation = (): any => mutation.mutate();

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (uid) => {
      setUid(uid);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
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
      setIsAuthenticated(true);
  
      Toast.show({
        type: "error",
        text1: "Error signing up",
        text2: "Please try again."
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
              onPress={callUseMutation}
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
