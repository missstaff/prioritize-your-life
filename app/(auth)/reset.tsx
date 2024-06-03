import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function ResetPassword() {
    return (
        <View style={styles.container}>
            <TextInput placeholder="Email" style={styles.input} />
            <TouchableOpacity onPress={() => {}} style={styles.button}>
                <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Link href="./signin" style={styles.link}>Sign In</Link>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: "80%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        width: "80%",
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "white",
    },
    link: {
        color: "blue",
    },
});
