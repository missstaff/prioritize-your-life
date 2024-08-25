import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import Column from "../Column";

describe("Column Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with no children", () => {
    const { toJSON } = render(<Column children={undefined} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with children", () => {
    const { getByText } = render(
      <Column>
        <Text>Test Child</Text>
      </Column>
    );
    expect(getByText("Test Child")).toBeTruthy();
  });
});
