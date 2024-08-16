import Toast from "react-native-toast-message";
import { getFirebase } from "@/app/common/get-firebase";
import { isValidEmail, validateAuthFormInput } from "../utilities";
import {
    HandleResetPasswordProps,
    SignInProps,
    SignUpProps,
} from "@/app/types";

export const handleResetPassword = async ({
    email,
}: HandleResetPasswordProps) => {
    if(email === "") {
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
    const { isValid, message } = validateAuthFormInput(email, password);
    if (!isValid) {
        throw new Error(message);
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
        throw new Error("Error signing in." + error.message  ?? error);
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
