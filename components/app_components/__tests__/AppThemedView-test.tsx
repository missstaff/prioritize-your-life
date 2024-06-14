import * as React from "react";
import renderer from "react-test-renderer";
import { AppThemedView } from "../AppThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

describe("AppThemedView Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`renders correctly`, () => {
    const tree = renderer.create(<AppThemedView />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with dark theme", () => {
    const mockDarkColor = "#000000";
    (useThemeColor as jest.Mock).mockReturnValue(mockDarkColor);
    const tree = renderer.create(<AppThemedView />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with light theme", () => {
    const mockLightColor = "#ffffff";
    (useThemeColor as jest.Mock).mockReturnValue(mockLightColor);
    const tree = renderer.create(<AppThemedView />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
