import React from 'react';
import { Button, View } from 'react-native';
// import { type ErrorBoundaryProps } from 'expo-router';
import AppThemedView from "./app_components/AppThemedView";
import AppThemedText from "./app_components/AppThemedText";
import AppThemedSafeAreaView from "./app_components/AppThemedSafeAreaView";

interface ErrorBoundaryProps {
    children: React.ReactNode;
    error: Error | string| null;
    retry: () => void;
}

// #TODO: style this component
const ErrorBoundary = ({ error, retry }: ErrorBoundaryProps) => {
  return (
    <AppThemedSafeAreaView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
      <AppThemedText style={{ color: 'white', marginBottom: 10 }}>Something went wrong:</AppThemedText>
      <AppThemedText style={{ color: 'white' }}>{typeof error === "string" ? error : error?.message}</AppThemedText>
      <Button title="Try Again" onPress={retry} />
      </View>
    </AppThemedSafeAreaView>
  );
}

export default ErrorBoundary;
