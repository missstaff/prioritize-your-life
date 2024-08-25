import { getFirebase } from "@/app/common/get-firebase";
import { isValidEmail, isValidPassword } from "../utilities";
import { ResetPasswordProps, SignInProps, SignUpProps } from "@/app/types";
import { router } from "expo-router";

export const handleResetPassword = async ({ email }: ResetPasswordProps) => {
  if (email === "") {
    throw new Error("Email is required.");
  }
  if (!isValidEmail(email)) {
    throw new Error("Invalid email address.");
  }
  try {
    const firebase = await getFirebase();
    await firebase.auth().sendPasswordResetEmail(email);
  } catch (error: any) {
    throw new Error("Error resetting password", error.message ?? error);
  }
};

export const handleSignIn = async ({ email, password }: SignInProps) => {
  if (!email) {
    throw new Error("Email is required.");
  }
  if (!password) {
    throw new Error("Password is required.");
  }
  try {
    const firebase = await getFirebase();
    const userCreds = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    if (userCreds) {
      return userCreds.user.uid;
    }
  } catch (error: any) {
    throw new Error("Error signing in." + error.message ?? error);
  }
};

export const handleSignUp = async ({
  email,
  confirmPassword,
  password,
}: SignUpProps) => {
  if (!email) {
    throw new Error("Email is required.");
  }
  if (!isValidEmail(email)) {
    throw new Error("Invalid email address.");
  }
  if (!password) {
    throw new Error("Password is required.");
  }
  if (!isValidPassword(password)) {
    throw new Error("Invalid password");
  }
  if (!confirmPassword) {
    throw new Error("Password confirmation is required.");
  }
  if (!isValidPassword(password)) {
    throw new Error("Invalid password");
  }
  if (confirmPassword !== password) {
    throw new Error("Passwords do not match.");
  }

  try {
    const firebase = await getFirebase();
    const userCreds = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (userCreds) {
      return userCreds.user.uid;
    }
  } catch (error: any) {
    throw new Error("Error signing up." + error.message ?? error);
  }
};

export const logout = async (
  setIsVisible: (isVisible: boolean) => void,
  setIsAuthenticated: (isAuthenticated: boolean) => void,
  setUid: (uid: string) => void
) => {
  const firebase = await getFirebase();
  if (!firebase) {
    throw new Error("Firebase app not initialized");
  }

  try {
    await firebase.auth().signOut();
    setIsVisible(false);
    setIsAuthenticated(false);
    setUid("");
    router.push("/");
  } catch (error: any) {
    throw new Error("Error logging out" + error.message ?? error);
  }
};
