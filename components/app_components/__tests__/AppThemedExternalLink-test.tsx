import React from "react";
import { Platform } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import renderer, { act } from "react-test-renderer";
import { AppThemedExternalLink } from "../AppThemedExternalLink";
import { openBrowserAsync } from "expo-web-browser";


describe("AppThemedExternalLink", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <AppThemedExternalLink href="https://www.google.com">
          Snapshot test!
        </AppThemedExternalLink>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("onPress navigates to another page on web platforms", async () => {
    Platform.OS = "web"; // Simulate a web platform

    const href = "https://www.google.com";

    const { getByText } = render(
      <AppThemedExternalLink href={href}>Test Link</AppThemedExternalLink>
    );

    const link = getByText("Test Link");
    fireEvent.press(link);

    expect(openBrowserAsync).not.toHaveBeenCalled();
  });
  it("onPress navigates to an external link on native platforms", async () => {
    Platform.OS = "ios"; // Simulate a native platform

    const href = "https://www.google.com";
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
});
