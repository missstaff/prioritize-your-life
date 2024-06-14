import * as React from "react";
import renderer from "react-test-renderer";
import { AppThemedView } from "../AppThemedView";

it(`renders correctly`, () => {
  const tree = renderer.create(<AppThemedView />).toJSON();

  expect(tree).toMatchSnapshot();
});