import React from "react";
import renderer from "react-test-renderer";
import AppThemedTouchableOpacity from "../AppThemedTouchableOpacity";
import { TouchableOpacity } from "react-native";

describe("AppThemedTouchableOpacity Tests", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    const tree = renderer
      .create(
        <AppThemedTouchableOpacity onPress={jest.fn()}>
          Click Me
        </AppThemedTouchableOpacity>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with custom styles", () => {
    const customBtnStyle = { backgroundColor: "red" };
    const customTextStyle = { fontSize: 20 };

    const tree = renderer
      .create(
        <AppThemedTouchableOpacity
          btnStyles={customBtnStyle}
          textStyles={customTextStyle}
        >
          Custom Button
        </AppThemedTouchableOpacity>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("triggers onPress correctly", () => {
    const onPressMock = jest.fn();

    const component = renderer.create(
      <AppThemedTouchableOpacity onPress={onPressMock}>
        Pressable
      </AppThemedTouchableOpacity>
    );

    const button = component.root.findByType(TouchableOpacity);
    button.props.onPress();

    expect(onPressMock).toHaveBeenCalled();
  });

  it("renders correctly when disabled", () => {
    const tree = renderer
      .create(
        <AppThemedTouchableOpacity disabled>
          Disabled Button
        </AppThemedTouchableOpacity>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});