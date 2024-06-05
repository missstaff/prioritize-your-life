import React, { useContext, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import { router } from "expo-router";
import AppThemedLink from "@/components/app_components/AppThemedLink";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppTouchableOpacity from "@/components/app_components/AppTouchableOpacity";
import { AppContext } from "@/store/app-context";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { getFireApp } from "@/getFireApp";
import { isValidEmail, isValidPassword, validateFormInput } from "./utilities";
import { AppIcon } from "@/components/app_components/AppIcon";


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
      if (!validateFormInput(email, password, confirmPassword)) {
        alert("Invalid email address or password. Please try again.");
        return;
      }
      setIsLoading(true);

      const firebase = await getFireApp();
      if (!firebase) throw new Error("Firebase app not initialized");

      const userCreds = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (userCreds) {
        setIsAuthenticated(true);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setIsLoading(false);
        throw new Error("User not found");
      }
    } catch (error: any) {
      const errorMessage =
        "Error signing up:" + (error.message ?? "Unknown error occurred");
      console.error(errorMessage + "\nStackTrace: " + error);
      setIsLoading(false);
      alert(errorMessage);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <AppThemedView style={styles.container}>
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
        setValue={setPassword}
        value={password}
      />
      <AppTouchableOpacity onPress={signUp}>Sign Up</AppTouchableOpacity>
      <AppThemedLink to="./signin">Sign In</AppThemedLink>
    </AppThemedView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default SignUp;
