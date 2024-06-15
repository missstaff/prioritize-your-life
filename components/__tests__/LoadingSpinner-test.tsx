import * as React from "react";
import renderer from "react-test-renderer";
import LoadingSpinner from "../LoadingSpinner";

it(`renders correctly`, () => {
  const tree = renderer.create(<LoadingSpinner />).toJSON();

  expect(tree).toMatchSnapshot();
});