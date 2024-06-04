import React, { useContext, useState } from "react";
import { Link } from "expo-router";
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { getFireApp } from "@/getFireApp";
import { AppContext } from "@/store/app-context";
import { 
    isValidEmail, 
    isValidPassword, 
    validateFormInput 
} from "./utilities";
import { ThemedView } from "@/components/ThemedView";
import AppTextInput from "@/components/AppTextInput";
import AppTouchableOpacity from "@/components/AppTouchableOpacity";
import AppLink from "@/components/AppLink";

const SignIn = (): JSX.Element => {
    const {
        isLoading,
        setIsLoading,
        isAuthenticated,
        setIsAuthenticated
    } = useContext(AppContext);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const signIn = async () => {
        try {
            setIsLoading(true);

            const firebase = await getFireApp();
            if (!firebase) {
                throw new Error("Firebase app not initialized");
            }

            const userCreds = await firebase.auth().signInWithEmailAndPassword(email, password);
            if (!userCreds) {
                setIsLoading(false);
                throw new Error("User not found");
            }

            setEmail("");
            setPassword("");
            setIsAuthenticated(true);
            setIsLoading(false);
        } catch (error: any) {
            const errorMessage =
                "Error signing in: " +
                (error.message ?? "Unknown error occurred.");
            console.error(errorMessage + "\nStackTrace: " + error.stack);
            setIsLoading(false);
            alert(errorMessage);
        }
    };

    const onSubmit = () => {
        if (!validateFormInput(email, password)) {
            alert("Invalid email address or password. Please try again.");
            return;
        }
        signIn();
    };

    if (!isAuthenticated && isLoading) return <Text>Loading...</Text>;

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

        <AppTouchableOpacity onPress={onSubmit} />
        <AppLink to="./signup">Sign Up</AppLink>
        <AppLink to="./reset">Forgot Password</AppLink>

    </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
});

export default SignIn;
