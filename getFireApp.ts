import { Platform } from "react-native";
import firebase from "@react-native-firebase/app";
import { getAnalytics } from "firebase/analytics";
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';


export function getFireApp() {
    
  const firebaseConfig = {
    apiKey: "AIzaSyClwjBrUSmYyrVZAKmoavJVeWgYyM7KMOk",
    appName: "prioritize-your-life",
    authDomain: "prioritize-your-life.firebaseapp.com",
    databaseURL: "https://prioritize-your-life-default-rtdb.firebaseio.com",
    projectId: "prioritize-your-life",
    storageBucket: "prioritize-your-life.appspot.com",
    messagingSenderId: "980814194666",
    measurementId: "G-PPW3VVC1TJ",
    appId: "",
  };

  // Conditionally set the appId based on the platform
  if (Platform.OS === "ios") {
    firebaseConfig.appId = "1:980814194666:ios:e00705e05f06f4fd397493";
  } else if (Platform.OS === "android") {
    firebaseConfig.appId = "1:980814194666:android:cc4b59aa1a0a1da8397493";
  } else if (Platform.OS === "web") {
    firebaseConfig.appId = "1:980814194666:web:9e1d51ea70568a40397493";
  }

  if (!firebase.apps.find(app => app.name === firebaseConfig.appName)) {
    return firebase.initializeApp(firebaseConfig, firebaseConfig.appName);
    // const analytics = getAnalytics(app);
  }
  return firebase.app(firebaseConfig.appName);
};
