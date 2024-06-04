import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";
import { AppContext } from "@/store/app-context";
import { getFireApp } from "@/getFireApp";
import { isValidEmail, isValidPassword, validateFormInput } from "./utilities";
import { ThemedView } from "@/components/ThemedView";
import AppTextInput from "@/components/AppTextInput";
import AppLink from "@/components/AppLink";
import AppTouchableOpacity from "@/components/AppTouchableOpacity";

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
    <ThemedView style={styles.container}>
      <AppTextInput
        checkValue={isValidEmail}
        icon="email"
        placeholder="Email"
        secureEntry={false}
        setValue={setEmail}
        value={email}
      />
      <AppTextInput
        checkValue={isValidPassword}
        icon="lock"
        placeholder="Password"
        secureEntry={true}
        setValue={setPassword}
        value={password}
      />
      <AppTextInput
        checkValue={isValidPassword}
        icon="lock"
        placeholder="Password"
        secureEntry={true}
        setValue={setPassword}
        value={password}
      />
      <AppTouchableOpacity onPress={signUp}>Sign Up</AppTouchableOpacity>
      <AppLink to="./signup">Sign In</AppLink>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
  },
  link: {
    color: "blue",
  },
});

export default SignUp;
