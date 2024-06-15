import * as React from "react";
import renderer from "react-test-renderer";
import { AppIcon } from "../AppIcon";

describe("AppIcon Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`renders correctly`, () => {
    const tree = renderer
      .create(<AppIcon name="home" size={30} color="red" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
