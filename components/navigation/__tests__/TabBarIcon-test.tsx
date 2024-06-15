import * as React from "react";
import renderer from "react-test-renderer";
import { TabBarIcon } from "../TabBarIcon";

it(`renders correctly`, () => {
  const tree = renderer.create(<TabBarIcon name="home" />).toJSON();

  expect(tree).toMatchSnapshot();
});
