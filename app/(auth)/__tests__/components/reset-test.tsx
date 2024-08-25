import React from "react";
import { useMutation } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";
import ResetPassword from "../../reset";


describe("ResetPassword Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("matches snapshot", () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      status: "idle",
    });

    const { toJSON } = render(<ResetPassword />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders the ResetPassword component correctly", () => {
    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      status: "idle",
    });

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByText("Reset Password")).toBeTruthy();
  });

  //   it("shows success message and redirects after successful password reset", async () => {
  // #TODO: - write this test
  //   });

  //   it("displays error message on failed password reset", async () => {
  // #TODO: - write this test
  //   });

  //   it("disables button while request is pending", () => {
  // #TODO: - write this test
  //   });
});
