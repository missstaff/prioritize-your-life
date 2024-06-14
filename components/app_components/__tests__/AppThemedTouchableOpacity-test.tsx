import * as React from "react";
import renderer from "react-test-renderer";
import { TouchableOpacity } from "react-native";
import AppThemedTouchableOpacity from "../../app_components/AppThemedTouchableOpacity";

// Snapshot test
it(`renders correctly`, () => {
  const tree = renderer.create(
    <AppThemedTouchableOpacity>
      Children Content
    </AppThemedTouchableOpacity>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

// Test onPress
it(`calls onPress when pressed`, () => {
  const onPress = jest.fn();
  const component = renderer.create(
    <AppThemedTouchableOpacity onPress={onPress}>
      Children Content
    </AppThemedTouchableOpacity>
  );

  // Find the TouchableOpacity and simulate a press
  const touchableOpacity = component.root.findByType(TouchableOpacity);
  touchableOpacity.props.onPress();

  expect(onPress).toHaveBeenCalled();
});
