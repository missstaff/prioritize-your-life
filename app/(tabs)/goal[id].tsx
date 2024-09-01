import React from "react";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { View, Text, Button, StyleSheet } from "react-native";

export default function GoalDetails() {
  const { id } = useGlobalSearchParams(); // This retrieves the goal ID from the URL
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goal Details</Text>
      <Text>Goal ID: {id}</Text>
      {/* Add more details about the goal using the ID to fetch data */}
      <Button title="Back to Goals" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
