import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

import { AppThemedText } from "@/components/app_components/AppThemedText";
import { AppThemedView } from "@/components/app_components/AppThemedView";
import { COLORTHEME } from "@/constants/Colors";

/**
 * #TODO determine if using or delete this component
 * A collapsible component that can be used to hide and show content.
 * @param {PropsWithChildren} children - The content to be displayed when the component is expanded.
 * @returns {JSX.Element} A collapsible component.
 */
export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  return (
    <AppThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
        testID="collapsible-header"
      >
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
          color={
            theme === "light" ? COLORTHEME.light.icon : COLORTHEME.dark.icon
          }
        />
        <AppThemedText type="defaultSemiBold">{title}</AppThemedText>
      </TouchableOpacity>
      {isOpen && (
        <AppThemedView style={styles.content} testID="collapsible-content">
          {children}
        </AppThemedView>
      )}
    </AppThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
