import Toast from "react-native-toast-message";
import { getFirebase } from "@/app/common/get-firebase";
import { isValidEmail, validateAuthFormInput } from "../utilities";
import {
    handleResetPasswordProps,
    SignInProps,
    SignUpProps,
} from "@/app/types";

export const handleResetPassword = async ({
    email,
}: handleResetPasswordProps) => {
    if (!isValidEmail(email)) {
        throw new Error("Invalid email address.");
    }
    try {
        const firebase = await getFirebase();
        await firebase.auth().sendPasswordResetEmail(email);
    } catch (error: any) {
        throw new Error("Error resetting password", error);
    }
};

export const handleSignIn = async ({ email, password }: SignInProps) => {
    if (!email) {
        Toast.show({
            type: "error",
            text1: "Email is required.",
            text2: "Please try again.",
        });
        return;
    }
    if (!password) {
        Toast.show({
            type: "error",
            text1: "Password is required.",
            text2: "Please try again.",
        });
        return;
    }
    const { isValid, message } = validateAuthFormInput(email, password);
    if (!isValid) {
        Toast.show({
            type: "error",
            text1: message,
            text2: "Please try again.",
        });
        return;
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
        throw new Error("Error signing in.", error);
    }
};

export const handleSignUp = async ({
    email,
    confirmPassword,
    password,
}: SignUpProps) => {
    if (!confirmPassword || !password) {
        Toast.show({
            type: "error",
            text1: "Password is required.",
            text2: "Please try again.",
        });
        return;
    }
    if (confirmPassword !== password) {
        Toast.show({
            type: "error",
            text1: "Passwords do not match.",
            text2: "Please try again.",
        });
        return;
    }
    const { isValid, message } = validateAuthFormInput(
        email,
        password,
        confirmPassword
    );
    if (!isValid) {
        Toast.show({
            type: "error",
            text1: message,
            text2: "Please try again.",
        });
        return;
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
        throw new Error("Error signing up.", error);
    }

};