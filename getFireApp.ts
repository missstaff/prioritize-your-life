import "@react-native-firebase/auth";
import "@react-native-firebase/database";
import "@react-native-firebase/dynamic-links";
import "@react-native-firebase/firestore";
import "@react-native-firebase/functions";
import "@react-native-firebase/in-app-messaging";
import "@react-native-firebase/messaging";
import "@react-native-firebase/storage";

import firebase from "@react-native-firebase/app";
import { Platform } from "react-native";

/**
 * Gets the firebase app.
 * @returns The firebase app.
 */
export function getFireApp() {
  const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY || "",
    appName: process.env.EXPO_PUBLIC_APP_NAME || "",
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN || "",
    databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL || "",
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID || "",
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET || "",
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID || "",
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID || "",
    appId: "",
  };

  try {
    if (Platform.OS === "ios") {
      firebaseConfig.appId = process.env.EXPO_PUBLIC_IOS_APP_ID || "";
    } else if (Platform.OS === "android") {
      firebaseConfig.appId = process.env.EXPO_PUBLIC_ANDROID_APP_ID || "";
    } else if (Platform.OS === "web") {
      firebaseConfig.appId = process.env.EXPO_PUBLIC_WEB_APP_ID || "";
    } else {
      throw new Error("Platform not supported");
    }

    if (!firebase.apps.find((app) => app.name === firebaseConfig.appName)) {
      return firebase.initializeApp(firebaseConfig, firebaseConfig.appName);
    }
    return firebase.app(firebaseConfig.appName);
  } catch (e) {
    console.error("Failed to instantiate firebase app", e);
  }
}
