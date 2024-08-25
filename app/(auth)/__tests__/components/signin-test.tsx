import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import SignIn from "../../signin";
import { AuthContext, AuthContextType } from "@/store/auth/auth-context";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

describe("SignIn Component", () => {
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
        <SignIn />
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
        <SignIn />
      </AuthContext.Provider>
    );

    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByText("Sign In")).toBeTruthy();
    expect(getByText("Sign Up")).toBeTruthy();
    expect(getByText("Reset Password")).toBeTruthy();
  });

  it("navigates to the Sign Up page", () => {
    (useMutation as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
      status: "idle",
    }));

    const { getByText } = render(
      <AuthContext.Provider value={authContextValue}>
        <SignIn />
      </AuthContext.Provider>
    );

    fireEvent.press(getByText("Sign Up"));
    expect(router.push).toHaveBeenCalledWith("/signup");
  });

  it("navigates to the Reset Password page", () => {
    (useMutation as jest.Mock).mockImplementation(() => ({
      mutate: jest.fn(),
      status: "idle",
    }));

    const { getByText } = render(
      <AuthContext.Provider value={authContextValue}>
        <SignIn />
      </AuthContext.Provider>
    );

    fireEvent.press(getByText("Reset Password"));
    expect(router.push).toHaveBeenCalledWith("/reset");
  });

  //   it("handles successful sign-in", async () => {
  //    #TODO: - write this test
  //   });

  //   it("handles sign-in error", async () => {
  //    #TODO: - write this test
  //   });
});
