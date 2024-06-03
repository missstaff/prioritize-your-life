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

    if (!isAuthenticated && isLoading) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            <TextInput
                onBlur={(e) => {
                    if(email.length > 0) isValidEmail(email);
                }}
                onChange={(e) => setEmail(e.nativeEvent.text)}
                placeholder="Email"
                style={styles.input}
                value={email}
            />
            <TextInput
                onBlur={(e) => {
                    if(password.length > 0) isValidPassword(password);
                }}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
                value={password}
            />
            <TouchableOpacity onPress={() => {
                if(validateFormInput(email, password)) {
                    signIn();
                }else{
                    alert("Invalid email address and/or password. Please try again.");
                }
            }} style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Link href="./signup" style={styles.link}>
                    Sign Up
                </Link>
            </TouchableOpacity>

            <TouchableOpacity>
                <Link href="./reset" style={styles.link}>
                    Forgot Password
                </Link>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        width: "80%",
    },
    button: {
        alignItems: "center",
        backgroundColor: "blue",
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        width: "80%",
    },
    buttonText: {
        color: "white",
    },
    link: {
        color: "blue",
        marginBottom: 10,
    },
});

export default SignIn;
