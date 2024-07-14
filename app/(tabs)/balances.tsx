import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { AppThemedExternalLink } from '@/components/app_components/AppThemedExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { AppThemedText } from '@/components/app_components/AppThemedText';
import { AppThemedView } from '@/components/app_components/AppThemedView';

export default function TabTwoScreen() {
  return (
   <AppThemedText>
      Balances
   </AppThemedText>
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
