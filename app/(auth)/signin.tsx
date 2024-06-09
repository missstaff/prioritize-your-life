import React, { useContext, useState } from "react";
import Toast from "react-native-toast-message";
import { ScaledSheet } from "react-native-size-matters";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppTouchableOpacity from "@/components/app_components/AppTouchableOpacity";
import AppLink from "@/components/app_components/AppLink";
import { isValidEmail, isValidPassword, validateFormInput } from "./utilities";
import { AppContext } from "@/store/app-context";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { getFireApp } from "@/getFireApp";
import LoadingSpinner from "@/components/LoadingSpinner";
import ShowIf from "@/components/ShowIf";

/**
 * A component that renders a sign-in form.
 */
const SignIn = (): JSX.Element => {
  const { isLoading, setIsLoading, setIsAuthenticated } =
    useContext(AppContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = async () => {
    try {
      
      const emailToLower = email.toLocaleLowerCase();
      setIsLoading(true);

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
      if (!userCreds) {
        setIsLoading(false);
        Toast.show({
          type: "error",
          text1: "User not found!",
        });
      }

      setEmail("");
      setPassword("");
      setIsAuthenticated(true);
      setIsLoading(false);

    } catch (error: any) {
      const errorMessage =
        "Error signing in: " + (error.message ?? "Unknown error occurred.");
      console.error(errorMessage + "\nStackTrace: " + error.stack);
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "Error signing in.",
        text2: errorMessage,
      });
    }
  };

  const onSubmit = () => {
    if (!validateFormInput(email, password)) {
      return;
    }
    signIn();
  };


  return (
    <AppThemedView style={styles.container}>
      <ShowIf
        condition={isLoading}
        render={
          <LoadingSpinner />
        }
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

            <AppTouchableOpacity onPress={onSubmit}>
              Sign In
            </AppTouchableOpacity>
            <AppLink to="./signup">Sign Up</AppLink>
            <AppLink to="./reset">Reset Password</AppLink>
          </>
        }
      />
    </AppThemedView>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default SignIn;
