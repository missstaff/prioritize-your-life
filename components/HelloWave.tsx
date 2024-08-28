import { ScaledSheet, s } from "react-native-size-matters";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

import AppThemedText from "@/components/app_components/AppThemedText";

// #TODO: determine if this component will be used if so, write tests for it, else delete it
export function HelloWave() {
  const rotationAnimation = useSharedValue(0);

  rotationAnimation.value = withRepeat(
    withSequence(
      withTiming(25, { duration: 150 }),
      withTiming(0, { duration: 150 })
    ),
    4 // Run the animation 4 times
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <AppThemedText style={styles.text}>👋</AppThemedText>
    </Animated.View>
  );
}

const styles = ScaledSheet.create({
  text: {
    fontSize: s(28),
    lineHeight: s(32),
    marginTop: s(-6),
  },
});
