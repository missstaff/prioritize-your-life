import { router } from "expo-router";
import { AppThemedText } from "../app_components/AppThemedText";
import { AppThemedView } from "../app_components/AppThemedView";
import { ScaledSheet } from "react-native-size-matters";

/**
 * Renders an error message component.
 * 
 * @param error - The error object.
 * @returns The rendered error message component.
 */
export default function OnError(error: any) {
    return (
        <AppThemedView
        style={{
          
        }}
      >
        <AppThemedText>Error: {error.message}</AppThemedText>
        <AppThemedText style={styles.text}type="link" onPress={() => router.push("/")}>
          Home
        </AppThemedText>
      </AppThemedView>
    );
};

const styles = ScaledSheet.create({
    container: {
        display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
    },
    text: {
        fontSize: "16@s",
        textAlign: "center",
    },
});