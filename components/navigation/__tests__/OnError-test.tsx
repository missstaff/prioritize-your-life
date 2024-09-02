import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";
import OnError from "../../OnError";

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

describe("OnError", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("matches snapshot", () => {
    const { toJSON } = render(
      <OnError error={{ message: "Test error message" }} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders the error message and Home link correctly", () => {
    const mockError = { message: "Test error message" };

    const { getByText } = render(<OnError error={mockError} />);

    //     // Check if the error message is rendered
    expect(getByText("Error: ")).toBeTruthy();

    //     // Check if the Home link is rendered
    const homeLink = getByText("Home");
    expect(homeLink).toBeTruthy();
  });

  it("navigates to the home page when the Home link is pressed", () => {
    const mockError = { message: "Test error message" };

    const { getByText } = render(<OnError error={mockError} />);

    fireEvent.press(getByText("Home"));

    expect(router.push).toHaveBeenCalledWith("/");
  });
});
