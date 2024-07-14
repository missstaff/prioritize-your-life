import React, { useContext } from "react";
import { StyleSheet, SafeAreaView, ScrollView, useColorScheme } from "react-native";
import { AppThemedText } from "@/components/app_components/AppThemedText";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import SignIn from "../(auth)/signin";
import { AppContext } from "../../store/app-context";
import ShowIf from "@/components/ShowIf";

const HomeScreen = () => {
  const { isAuthenticated } = useContext(AppContext);


  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.container}>
      <ShowIf
        condition={!isAuthenticated}
        render={<SignIn />}
        renderElse={
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <AppThemedView style={[styles.section, {backgroundColor: colorScheme === "dark" ? "#687076" : "#fff"}]}>
              <AppThemedText style={styles.sectionTitle}>Account Balances</AppThemedText>
              <AppThemedText style={styles.text}>Enter and view your account balances here.</AppThemedText>
            </AppThemedView>

            <AppThemedView style={[styles.section, {backgroundColor: colorScheme === "dark" ? "#687076" : "#fff"}]}>
              <AppThemedText style={styles.sectionTitle}>Income & Expenses</AppThemedText>
              <AppThemedText style={styles.text}>Track your income and expenses here.</AppThemedText>
            </AppThemedView>

            <AppThemedView style={[styles.section, {backgroundColor: colorScheme === "dark" ? "#687076" : "#fff"}]}>
              <AppThemedText style={styles.sectionTitle}>Budget</AppThemedText>
              <AppThemedText style={styles.text}>Create and manage your budget here.</AppThemedText>
            </AppThemedView>

            <AppThemedView style={[styles.section, {backgroundColor: colorScheme === "dark" ? "#687076" : "#fff"}]}>
              <AppThemedText style={styles.sectionTitle}>Saving & Planning</AppThemedText>
              <AppThemedText style={styles.text}>Plan your savings and financial goals here.</AppThemedText>
            </AppThemedView>
          </ScrollView>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  section: {
    width: '90%',
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
