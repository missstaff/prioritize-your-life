import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import { Collapsible } from "../Collapsible";

describe("Collapsible", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(<Collapsible title="title">Content</Collapsible>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("toggles open and close when header is pressed", () => {
    const { getByTestId, queryByTestId } = render(
      <Collapsible title="title">Content</Collapsible>
    );

    expect(queryByTestId("collapsible-content")).toBeNull();

    fireEvent.press(getByTestId("collapsible-header"));

    expect(queryByTestId("collapsible-content")).not.toBeNull();

    fireEvent.press(getByTestId("collapsible-header"));

    expect(queryByTestId("collapsible-content")).toBeNull();
  });
});
