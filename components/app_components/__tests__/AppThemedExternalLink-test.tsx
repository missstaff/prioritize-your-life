import React from "react";
import { Platform } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import renderer, { act } from "react-test-renderer";
import  AppThemedExternalLink from "../AppThemedExternalLink";
import { openBrowserAsync } from "expo-web-browser";
import { useThemeColor } from "@/hooks/useThemeColor";

describe("AppThemedExternalLink", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const url = "https://www.google.com";

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <AppThemedExternalLink href={url}>Snapshot test!</AppThemedExternalLink>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("onPress navigates to another page on web platforms", async () => {
    Platform.OS = "web";

    const href = url;

    const { getByText } = render(
      <AppThemedExternalLink href={href}>Test Link</AppThemedExternalLink>
    );

    const link = getByText("Test Link");
    fireEvent.press(link);

    expect(openBrowserAsync).not.toHaveBeenCalled();
  });

  it("onPress navigates to an external link on native platforms", async () => {
    Platform.OS = "ios";

    const href = url;
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    const { getByText } = render(
      <AppThemedExternalLink href={href}>Test Link</AppThemedExternalLink>
    );

    const link = getByText("Test Link");
    fireEvent.press(link, mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(openBrowserAsync).toHaveBeenCalledWith(href);
  });

  it("onPress navigates to an external link on Android platforms", async () => {
    Platform.OS = "android";

    const href = url;
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    const { getByText } = render(
      <AppThemedExternalLink href={href}>Test Link</AppThemedExternalLink>
    );

    const link = getByText("Test Link");
    fireEvent.press(link, mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(openBrowserAsync).toHaveBeenCalledWith(href);
  });

  it("renders correctly with dark theme", () => {
    const mockDarkColor = "#000000";
    (useThemeColor as jest.Mock).mockReturnValue(mockDarkColor);
    const tree = renderer
      .create(
        <AppThemedExternalLink href={url}>Snapshot test!</AppThemedExternalLink>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with light theme", () => {
    const mockLightColor = "#FFFFFF";

    (useThemeColor as jest.Mock).mockReturnValue(mockLightColor);

    const tree = renderer
      .create(
        <AppThemedExternalLink href={url}>Snapshot test!</AppThemedExternalLink>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
