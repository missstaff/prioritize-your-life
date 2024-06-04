import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { AppThemedText } from '@/components/app_components/AppThemedText';
import { AppThemedView } from '@/components/app_components/AppThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <AppThemedView style={styles.container}>
        <AppThemedText type="title">This screen doesn't exist.</AppThemedText>
        <Link href="/" style={styles.link}>
          <AppThemedText type="link">Go to home screen!</AppThemedText>
        </Link>
      </AppThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
