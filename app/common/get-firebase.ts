import Toast from "react-native-toast-message";
import { getFireApp } from "@/getFireApp";


export const getFirebase = async () => {
    const firebase = await getFireApp();
    if (!firebase || !("auth" in firebase)) {
        Toast.show({
            type: "error",
            text1: "Unable to connect to firebase.",
            text2: "Please try again.",
        });
    }
    return firebase;
};