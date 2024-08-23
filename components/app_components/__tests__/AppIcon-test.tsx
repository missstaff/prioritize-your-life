import React from "react";
import renderer from "react-test-renderer";
import { AppIcon } from "../AppIcon";

describe("AppIcon Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    const tree = renderer.create(<AppIcon name="home" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with a custom size", () => {
    const tree = renderer.create(<AppIcon name="home" size={32} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with a custom style", () => {
    const customStyle = { backgroundColor: "blue", padding: 10 };
    const tree = renderer
      .create(<AppIcon name="home" style={customStyle} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with a different icon", () => {
    const tree = renderer.create(<AppIcon name="settings" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with custom color", () => {
    const tree = renderer.create(<AppIcon name="home" color="red" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
