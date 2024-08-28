import * as React from "react";
import renderer from "react-test-renderer";
import { View } from "react-native";
import AppThemedView  from "../AppThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

describe("AppThemedView Tests", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default theme", () => {
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

  it("applies correct background color from theme", () => {
    const mockColor = "#ff6347";
    (useThemeColor as jest.Mock).mockReturnValue(mockColor);

    const component = renderer.create(<AppThemedView />);
    const view = component.root.findByType(View);

    expect(view.props.style).toContainEqual({ backgroundColor: mockColor });
  });
});