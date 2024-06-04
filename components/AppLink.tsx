import React from "react";
import { Link } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";

const AppLink = ({ to,children }: {
    to: string;
    children: React.ReactNode;
}) => {
    return (
        <TouchableOpacity>
            <Link href={to} style={styles.link}>
                {children}
            </Link>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    link: {
        color: "blue",
        marginBottom: 10,
    },
});

export default AppLink;
