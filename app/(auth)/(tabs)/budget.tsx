import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import AppThemedExternalLink from '@/components/app_components/AppThemedExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import AppThemedText from '@/components/app_components/AppThemedText';
import AppThemedView  from '@/components/app_components/AppThemedView';

const TabFiveScreen = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <AppThemedView style={styles.titleContainer}>
        <AppThemedText type="title">Explore</AppThemedText>
      </AppThemedView>
      <AppThemedText>This app includes example code to help you get started.</AppThemedText>
      <Collapsible title="File-based routing">
        <AppThemedText>
          This app has two screens:{' '}
          <AppThemedText type="defaultSemiBold">app/(tabs)/index.tsx</AppThemedText> and{' '}
          <AppThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</AppThemedText>
        </AppThemedText>
        <AppThemedText>
          The layout file in <AppThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</AppThemedText>{' '}
          sets up the tab navigator.
        </AppThemedText>
        <AppThemedExternalLink href="https://docs.expo.dev/router/introduction">
          <AppThemedText type="link">Learn more</AppThemedText>
        </AppThemedExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <AppThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <AppThemedText type="defaultSemiBold">w</AppThemedText> in the terminal running this project.
        </AppThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <AppThemedText>
          For static images, you can use the <AppThemedText type="defaultSemiBold">@2x</AppThemedText> and{' '}
          <AppThemedText type="defaultSemiBold">@3x</AppThemedText> suffixes to provide files for
          different screen densities
        </AppThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <AppThemedExternalLink href="https://reactnative.dev/docs/images">
          <AppThemedText type="link">Learn more</AppThemedText>
        </AppThemedExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <AppThemedText>
          Open <AppThemedText type="defaultSemiBold">app/_layout.tsx</AppThemedText> to see how to load{' '}
          <AppThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </AppThemedText>
        </AppThemedText>
        <AppThemedExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <AppThemedText type="link">Learn more</AppThemedText>
        </AppThemedExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <AppThemedText>
          This template has light and dark mode support. The{' '}
          <AppThemedText type="defaultSemiBold">useColorScheme()</AppThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </AppThemedText>
        <AppThemedExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <AppThemedText type="link">Learn more</AppThemedText>
        </AppThemedExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <AppThemedText>
          This template includes an example of an animated component. The{' '}
          <AppThemedText type="defaultSemiBold">components/HelloWave.tsx</AppThemedText> component uses
          the powerful <AppThemedText type="defaultSemiBold">react-native-reanimated</AppThemedText> library
          to create a waving hand animation.
        </AppThemedText>
        {Platform.select({
          ios: (
            <AppThemedText>
              The <AppThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</AppThemedText>{' '}
              component provides a parallax effect for the header image.
            </AppThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default TabFiveScreen;
