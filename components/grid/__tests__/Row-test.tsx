import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import Row from "../Row";

describe("Row Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with no children", () => {
    const { toJSON } = render(<Row children={undefined} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with children", () => {
    const { getByText } = render(
      <Row>
        <Text>Test Child</Text>
      </Row>
    );
    expect(getByText("Test Child")).toBeTruthy();
  });
});
