import React, { useContext, useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppTouchableOpacity from "@/components/app_components/AppTouchableOpacity";
import AppThemedLink from "@/components/app_components/AppThemedLink";
import { isValidEmail, isValidPassword, validateFormInput } from "./utilities";
import { AppContext } from "@/store/app-context";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { getFireApp } from "@/getFireApp";
import { AppThemedText } from "@/components/app_components/AppThemedText";

const SignIn = (): JSX.Element => {
  const { isLoading, setIsLoading, isAuthenticated, setIsAuthenticated } =
    useContext(AppContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = async () => {
    try {
      setIsLoading(true);

      const firebase = await getFireApp();
      if (!firebase) {
        throw new Error("Firebase app not initialized");
      }

      const userCreds = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (!userCreds) {
        setIsLoading(false);
        throw new Error("User not found");
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
      alert(errorMessage);
    }
  };

  const onSubmit = () => {
    if (!validateFormInput(email, password)) {
      alert("Invalid email address or password. Please try again.");
      return;
    }
    signIn();
  };

  if (!isAuthenticated && isLoading)
    return (
      <AppThemedView>
        <AppThemedText>Loading...</AppThemedText>
      </AppThemedView>
    );

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
      <AppThemedTextInput
        checkValue={isValidPassword}
        icon="lock"
        placeholder="Password"
        secureEntry={true}
        setValue={setPassword}
        value={password}
      />

      <AppTouchableOpacity onPress={onSubmit}>Sign In</AppTouchableOpacity>
      <AppThemedLink to="./signup">Sign Up</AppThemedLink>
      <AppThemedLink to="./reset">Forgot Password</AppThemedLink>
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
