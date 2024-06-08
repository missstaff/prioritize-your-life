import React, { useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { ScaledSheet } from "react-native-size-matters";
import { router } from "expo-router";
import AppLink from "@/components/app_components/AppLink";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppTouchableOpacity from "@/components/app_components/AppTouchableOpacity";
import LoadingSpinner from "@/components/LoadingSpinner";
import ShowIf from "@/components/ShowIf";
import { AppContext } from "@/store/app-context";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { getFireApp } from "@/getFireApp";
import { isValidEmail, validateFormInput, isValidPassword } from "./utilities";

/**
 * A component that renders a sign-up form.
 */
const SignUp = () => {
  const { isAuthenticated, setIsLoading, setIsAuthenticated } =
    useContext(AppContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const signUp = async () => {
    try {
      const emailToLowerCase = email.toLocaleLowerCase();
      if (!validateFormInput(emailToLowerCase, password, confirmPassword)) {
        return;
      }

      setIsLoading(true);

      const firebase = await getFireApp();
      if (!firebase) throw new Error("Firebase app not initialized");

      const userCreds = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailToLowerCase, password);

      if (userCreds) {
        setIsAuthenticated(true);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setIsLoading(false);
        Toast.show({
          type: "error",
          text1: "Error signing in",
          text2: "User not found.",
        });
      }
    } catch (error: any) {
      setIsLoading(false);

      const errorMessage =
        "Error signing up:" + (error.message ?? "Unknown error occurred");
      console.error(errorMessage + "\nStackTrace: " + error);

      Toast.show({
        type: "error",
        text1: "Error signing up",
        text2: errorMessage,
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <AppThemedView style={styles.container}>
      <ShowIf
        condition={!isAuthenticated}
        render={
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
              placeholder="Password"
              secureEntry={true}
              setValue={setConfirmPassword}
              value={confirmPassword}
            />
            <AppTouchableOpacity onPress={signUp}>Sign Up</AppTouchableOpacity>
            <AppLink to="./signin">Sign In</AppLink>
          </>
        }
        renderElse={<LoadingSpinner size="large" color="#0000ff" />}
      />
    </AppThemedView>
  );
};

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUp;
