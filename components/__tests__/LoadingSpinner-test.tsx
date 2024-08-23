import * as React from "react";
import renderer from "react-test-renderer";
import LoadingSpinner from "../LoadingSpinner";

describe("LoadingSpinner", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it("renders correctly with the given props", () => {
    const tree = renderer.create(<LoadingSpinner size="small" color="red" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});