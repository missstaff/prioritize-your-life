import Toast from "react-native-toast-message";
import { getFireApp } from "@/getFireApp";

/**
 * Gets the firebase app.
 * @returns The firebase app.
 */
export const getFirebase = async () => {
    const firebase = await getFireApp();
    if (!firebase) {
        console.error("Firebase app not initialized");
        Toast.show({
            type: "error",
            text1: "Unable to connect to firebase.",
            text2: "Please try again.",
        });
        throw new Error("Firebase app not initialized");
    }
    if (!("auth" in firebase)) {
        console.error("Firebase app does not have 'auth' property");
        Toast.show({
            type: "error",
            text1: "Server error.",
            text2: "Please try again.",
        });
        throw new Error("Firebase app does not have 'auth' property");
    }
    return firebase;
};