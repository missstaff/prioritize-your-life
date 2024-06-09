import React, { useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppTouchableOpacity from "@/components/app_components/AppTouchableOpacity";
import LoadingSpinner from "@/components/LoadingSpinner";
import ShowIf from "@/components/ShowIf";
import { AppContext } from "@/store/app-context";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { getFireApp } from "@/getFireApp";
import { isValidEmail, validateFormInput, isValidPassword } from "./utilities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import { styles } from "./styles";

export default function SignUp(): JSX.Element {
  const queryClient = useQueryClient();
  const { isAuthenticated, setIsAuthenticated, setUid  } = useContext(AppContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const signUp = async () => {
    const emailToLowerCase = email.toLocaleLowerCase();
    if (!validateFormInput(emailToLowerCase, password, confirmPassword)) {
      return;
    }

    const firebase = await getFireApp();
    if (!firebase) throw new Error("Firebase app not initialized");

    const userCreds = await firebase
      .auth()
      .createUserWithEmailAndPassword(emailToLowerCase, password);

    if (userCreds) {
      return userCreds.user.uid;
    } else {
      Toast.show({
        type: "error",
        text1: "Error signing in",
        text2: "User not found.",
      });
    }
  };

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (uid) => {
      setIsAuthenticated(true);
      setUid(uid);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      queryClient.invalidateQueries({ queryKey: ["uid"] });
    },
    onError: (error: any) => {
      const errorMessage =
        "Error signing up:" + (error.message ?? "Unknown error occurred");
      console.error(errorMessage + "\nStackTrace: " + error);
  
      Toast.show({
        type: "error",
        text1: "Error signing up",
        text2: errorMessage,
      });
    },
  });

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
              placeholder="Confirm Password"
              secureEntry={true}
              setValue={setConfirmPassword}
              value={confirmPassword}
            />
            <AppTouchableOpacity onPress={() => mutation.mutate()}>
              Sign Up
            </AppTouchableOpacity>
            <AppThemedText type="link" onPress={() => router.push("/signin")}>
              Sign In
            </AppThemedText>
          </>
        }
        renderElse={mutation.status === 'pending' && <LoadingSpinner size="large" color="#0000ff" />}
      />
    </AppThemedView>
  );
};

