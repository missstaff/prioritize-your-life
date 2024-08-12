import { Href, Link, LinkProps } from "expo-router";
import { Platform } from "react-native";
import { openBrowserAsync } from "expo-web-browser";
import { type ComponentProps } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { COLORTHEME } from "@/constants/Colors";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: Href<string | object>;
};

export function AppThemedExternalLink({ href, style, ...rest }: Props) {
  const color = useThemeColor(
    { light: COLORTHEME.light.background, dark: COLORTHEME.dark.background },
    "background"
  );
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== "web") {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync((href as string));
        }
      }}
      style={[{ color }, style]}
    />
  );
}
