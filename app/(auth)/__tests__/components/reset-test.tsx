import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ResetPassword from "../../reset";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));
jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

describe("ResetPassword Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mock calls
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

  // #TODO: FIX this test
  //   it("shows success message and redirects after successful password reset", async () => {
  //     const mockMutate = jest.fn();
  //     (useMutation as jest.Mock).mockReturnValue({
  //       mutate: (data: any, options: any) => options.onSuccess(),
  //       status: "idle",
  //     });

  //     const { getByText, getByPlaceholderText } = render(<ResetPassword />);

  //     const emailInput = getByPlaceholderText("Email");
  //     fireEvent.changeText(emailInput, "shawnastaff@gmail.com");
  //     fireEvent.press(getByText("Reset Password"));

  //     await waitFor(() => {
  //       expect(Toast.show).toHaveBeenCalledWith({
  //         type: "success",
  //         text1: "Password reset email sent.",
  //       });
  //       expect(router.push).toHaveBeenCalledWith("/");
  //     });
  //   });

  //   it("displays error message on failed password reset", async () => {
  //     const mockMutate = jest.fn();
  //     (useMutation as jest.Mock).mockReturnValue({
  //       mutate: (data: any, options: any) => options.onError({ message: "Reset failed" }),
  //       status: "idle",
  //     });

  //     const { getByText, getByPlaceholderText } = render(<ResetPassword />);

  //     const emailInput = getByPlaceholderText("Email");
  //     fireEvent.changeText(emailInput, "test@example.com");
  //     fireEvent.press(getByText("Reset Password"));

  //     await waitFor(() => {
  //       expect(Toast.show).toHaveBeenCalledWith({
  //         type: "error",
  //         text1: "Reset failed",
  //         text2: "Please try again.",
  //       });
  //     });
  //   });

  // #TODO: fix this test
  //   it("disables button while request is pending", () => {
  //     (useMutation as jest.Mock).mockReturnValue({
  //       mutate: jest.fn(),
  //       status: "pending",
  //     });

  //     const { getByTestId } = render(<ResetPassword />);

  //     const button = getByTestId("reset-password-button");
  //     expect(button.props.disabled).toBe(true);
  //   });
});
