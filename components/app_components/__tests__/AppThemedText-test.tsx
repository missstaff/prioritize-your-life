import React from "react";
import renderer from "react-test-renderer";
import { AppThemedText } from "../AppThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

describe("AppThemedText Tests", () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default type and light theme", () => {
    (useThemeColor as jest.Mock).mockReturnValue("#000000");

    const tree = renderer
      .create(<AppThemedText>Default Text</AppThemedText>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with title type and dark theme", () => {
    (useThemeColor as jest.Mock).mockReturnValue("#ffffff");

    const tree = renderer
      .create(<AppThemedText type="title">Title Text</AppThemedText>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with defaultSemiBold type", () => {
    (useThemeColor as jest.Mock).mockReturnValue("#000000");

    const tree = renderer
      .create(
        <AppThemedText type="defaultSemiBold">SemiBold Text</AppThemedText>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with subtitle type", () => {
    (useThemeColor as jest.Mock).mockReturnValue("#000000");

    const tree = renderer
      .create(<AppThemedText type="subtitle">Subtitle Text</AppThemedText>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with link type", () => {
    (useThemeColor as jest.Mock).mockReturnValue("#000000");

    const tree = renderer
      .create(<AppThemedText type="link">Link Text</AppThemedText>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with custom styles", () => {
    (useThemeColor as jest.Mock).mockReturnValue("#000000");

    const tree = renderer
      .create(
        <AppThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
          Custom Styled Text
        </AppThemedText>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
