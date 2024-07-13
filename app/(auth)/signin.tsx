import React, { useContext, useState } from "react";
import Toast from "react-native-toast-message";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import { isValidEmail, isValidPassword, validateFormInput } from "./utilities";
import { AppContext } from "@/store/app-context";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { getFireApp } from "@/getFireApp";
import LoadingSpinner from "@/components/LoadingSpinner";
import ShowIf from "@/components/ShowIf";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { styles } from "./styles";

/**
 * A component that renders a sign-in form.
 */
export default function SignIn(): JSX.Element {
  const { setIsAuthenticated, setUid } = useContext(AppContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = async () => {
    const emailToLower = email.toLocaleLowerCase();

    const firebase = await getFireApp();
    if (!firebase) {
      Toast.show({
        type: "error",
        text1: "There has been an error. Please try again.",
      });
      throw new Error("Firebase app not initialized");
    }

    const userCreds = await firebase
      .auth()
      .signInWithEmailAndPassword(emailToLower, password);

    if (userCreds) {
      return userCreds.user.uid;
    } else {
      Toast.show({
        type: "error",
        text1: "User not found!",
      });
    }
  };

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (uid) => {
      setEmail("");
      setPassword("");
      setIsAuthenticated(true);
      setUid(uid);
      router.push("/");
    },
    onError: (error: any) => {
      const errorMessage =
        "Error signing in: " + (error.message ?? "Unknown error occurred.");
      Toast.show({
        type: "error",
        text1: "Error signing in.",
        text2: errorMessage,
      });
    },
  });

  const onSubmit = () => {
    if (!validateFormInput(email, password)) {
      return;
    }
    mutation.mutate();
  };

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
            <AppThemedTouchableOpacity onPress={onSubmit}>
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
