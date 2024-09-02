import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, useColorScheme } from "react-native";
import { ScaledSheet, s, vs } from "react-native-size-matters";
import AppThemedText from "@/components/app_components/AppThemedText";
import AppThemedView from "@/components/app_components/AppThemedView";
import { COLORS } from "@/constants/Colors";

const HomeScreen = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <AppThemedView
          style={[
            styles.section,
            {
              backgroundColor:
                colorScheme === "dark" ? COLORS.mediumGray : COLORS.white,
            },
          ]}
        >
          <AppThemedText style={styles.sectionTitle}>
            Account Balances
          </AppThemedText>
          <AppThemedText style={styles.text}>
            Enter and view your account balances here.
          </AppThemedText>
        </AppThemedView>

        <AppThemedView
          style={[
            styles.section,
            {
              backgroundColor:
                colorScheme === "dark" ? COLORS.mediumGray : COLORS.white,
            },
          ]}
        >
          <AppThemedText style={styles.sectionTitle}>
            Income & Expenses
          </AppThemedText>
          <AppThemedText style={styles.text}>
            Track your income and expenses here.
          </AppThemedText>
        </AppThemedView>

        <AppThemedView
          style={[
            styles.section,
            {
              backgroundColor:
                colorScheme === "dark" ? COLORS.mediumGray : COLORS.white,
            },
          ]}
        >
          <AppThemedText style={styles.sectionTitle}>Budget</AppThemedText>
          <AppThemedText style={styles.text}>
            Create and manage your budget here.
          </AppThemedText>
        </AppThemedView>

        <AppThemedView
          style={[
            styles.section,
            {
              backgroundColor:
                colorScheme === "dark" ? COLORS.mediumGray : COLORS.white,
            },
          ]}
        >
          <AppThemedText style={styles.sectionTitle}>
            Saving & Planning
          </AppThemedText>
          <AppThemedText style={styles.text}>
            Plan your savings and financial goals here.
          </AppThemedText>
        </AppThemedView>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: vs(20),
  },
  section: {
    width: "90%",
    marginVertical: vs(10),
    padding: s(20),
    borderRadius: s(10),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: s(5),
    elevation: 3,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: s(18),
    fontWeight: "bold",
    marginBottom: vs(10),
  },
  text: {
    fontSize: s(16),
    textAlign: "center",
  },
});

export default HomeScreen;
