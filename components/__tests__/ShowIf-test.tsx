import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import ShowIf from "@/components/ShowIf";

describe("ShowIf Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ShowIf condition={true} render={<Text>Condition is true</Text>} />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders the content when the condition is true", () => {
    const { getByText } = render(
      <ShowIf condition={true} render={<Text>Condition is true</Text>} />
    );

    expect(getByText("Condition is true")).toBeTruthy();
  });

  it("renders the alternative content when the condition is false and renderElse is provided", () => {
    const { getByText } = render(
      <ShowIf
        condition={false}
        render={<Text>Condition is true</Text>}
        renderElse={<Text>Condition is false</Text>}
      />
    );

    expect(getByText("Condition is false")).toBeTruthy();
  });

  it("does not render anything when the condition is false and renderElse is not provided", () => {
    const { queryByText } = render(
      <ShowIf condition={false} render={<Text>Condition is true</Text>} />
    );

    expect(queryByText("Condition is true")).toBeNull();
    expect(queryByText("Condition is false")).toBeNull();
  });

  it("renders nothing when condition is true but render is null", () => {
    const { queryByText } = render(
      <ShowIf
        condition={true}
        render={null}
        renderElse={<Text>Condition is false</Text>}
      />
    );

    expect(queryByText("Condition is false")).toBeNull();
  });
});
