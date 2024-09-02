import React, { useContext, useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedTextInput from "@/components/app_components/AppThemedTextInput";
import AppThemedTouchableOpacity from "@/components/app_components/AppThemedTouchableOpacity";
import AppThemedView from "@/components/app_components/AppThemedView";
import LoadingSpinner from "@/components/LoadingSpinner";
import ShowIf from "@/components/ShowIf";
import { AuthContext } from "@/store/auth/auth-context";
import { isValidEmail, isValidPassword } from "./utilities";
import { handleSignUp } from "./apis/api";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Signup = (): JSX.Element => {
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
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: error.message,
        text2: "Please try again.",
      });
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
                setValue={setEmail}
                checkValue={isValidEmail}
              />
              <AppThemedTextInput
                keyboardType="default"
                placeholder="Password"
                secureEntry={true}
                value={password}
                checkValue={isValidPassword}
                setValue={setPassword}
              />
              <AppThemedTextInput
                keyboardType="default"
                placeholder="Confirm Password"
                secureEntry={true}
                value={confirmPassword}
                checkValue={isValidPassword}
                setValue={setConfirmPassword}
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
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Signup;
