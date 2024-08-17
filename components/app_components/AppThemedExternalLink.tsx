import { Href, Link } from "expo-router";
import { Platform } from "react-native";
import { openBrowserAsync } from "expo-web-browser";
import { type ComponentProps } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { COLORTHEME } from "@/constants/Colors";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: Href<string | object>;
};

/**
 * Renders a themed external link component.
 * @param {Props} props - The component props.
 * @param {string} props.href - The URL of the external link.
 * @param {React.CSSProperties} props.style - The custom style for the link.
 * @param {React.HTMLAttributes<HTMLAnchorElement>} props.rest - Additional HTML attributes for the link.
 * @returns {JSX.Element} The rendered themed external link component.
 */
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
