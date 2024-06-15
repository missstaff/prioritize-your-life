import * as React from "react";
import renderer from "react-test-renderer";
import { TouchableOpacity } from "react-native";
import AppThemedTouchableOpacity from "../../app_components/AppThemedTouchableOpacity";
import { useThemeColor } from "@/hooks/useThemeColor";

describe("AppThemedTouchableOpacity Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`renders correctly`, () => {
    const tree = renderer
      .create(
        <AppThemedTouchableOpacity>Children Content</AppThemedTouchableOpacity>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`calls onPress when pressed`, () => {
    const onPress = jest.fn();
    const component = renderer.create(
      <AppThemedTouchableOpacity onPress={onPress}>
        Children Content
      </AppThemedTouchableOpacity>
    );
    const touchableOpacity = component.root.findByType(TouchableOpacity);
    touchableOpacity.props.onPress();

    expect(onPress).toHaveBeenCalled();
  });

  it("renders correctly with dark theme", () => {
    const mockDarkColor = "#000000";
    (useThemeColor as jest.Mock).mockReturnValue(mockDarkColor);

    const tree = renderer
      .create(
        <AppThemedTouchableOpacity>Children Content</AppThemedTouchableOpacity>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with light theme", () => {
    const mockLightColor = "#ffffff";
    (useThemeColor as jest.Mock).mockReturnValue(mockLightColor);

    const tree = renderer
      .create(
        <AppThemedTouchableOpacity>Children Content</AppThemedTouchableOpacity>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
