import React from "react";
import { render } from "@testing-library/react-native";
import { TabBarIcon } from "../TabBarIcon";

jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons");

describe("TabBarIcon", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with the given props", () => {
    const { getByTestId } = render(
      <TabBarIcon name="home" testID="icon" style={{ color: "red" }} />
    );

    const icon = getByTestId("icon");

    expect(icon).toBeTruthy();
    expect(icon.props.style).toEqual([{ marginBottom: -3 }, { color: "red" }]);
    expect(icon.props.name).toBe("home");
  });
});
