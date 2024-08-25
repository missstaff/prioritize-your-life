import React from "react";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { render, fireEvent } from "@testing-library/react-native";
import SignUp from "../../signup";
import { AuthContext, AuthContextType } from "@/store/auth/auth-context";


jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn().mockReturnValue({
    invalidateQueries: jest.fn(),
  }),
}));
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

describe("SignUp Component", () => {
  const mockSetIsAuthenticated = jest.fn();
  const mockSetUid = jest.fn();

  const authContextValue: AuthContextType = {
    setIsAuthenticated: mockSetIsAuthenticated,
    setUid: mockSetUid,
    isAuthenticated: false,
    uid: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("matches snapshot", () => {
    (useMutation as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
      status: "idle",
    }));

    const { toJSON } = render(
      <AuthContext.Provider value={authContextValue}>
        <SignUp />
      </AuthContext.Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    (useMutation as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
      status: "idle",
    }));

    const { getByPlaceholderText, getByText } = render(
      <AuthContext.Provider value={authContextValue}>
        <SignUp />
      </AuthContext.Provider>
    );

    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByPlaceholderText("Confirm Password")).toBeTruthy();
    expect(getByText("Sign Up")).toBeTruthy();
    expect(getByText("Sign In")).toBeTruthy();
  });

  it("navigate to sign in page when Sign In is clicked", () => {
    (useMutation as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
      status: "idle",
    }));

    const { getByText } = render(
      <AuthContext.Provider value={authContextValue}>
        <SignUp />
      </AuthContext.Provider>
    );

    fireEvent.press(getByText("Sign In"));
    expect(router.push).toHaveBeenCalledWith("/");
  });

  // it("shows success message and redirects after successful sign up", async () => {
  // #TODO: - write this test
  // });

  // it("displays error message on failed sign up", async () => {
  // #TODO: - write this test
  // });

  // it("disables button while request is pending", () => {
  //     # TODO - write this test

  // });
});
