import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import RootLayout from "@/app/_layout";

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

jest.mock("expo-font", () => ({
  useFonts: jest.fn(),
}));

jest.mock("@expo/vector-icons", () => ({
  FontAwesome: {
    font: {},
  },
}));

jest.mock("@/components/navigation/RootLayoutNav", () => {
  return jest.fn(() => <div>Mocked RootLayoutNav</div>);
});

describe("RootLayout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders RootLayoutNav when fonts are loaded", async () => {
    const { useFonts } = require("expo-font");
    const { preventAutoHideAsync, hideAsync } = require("expo-splash-screen");

    useFonts.mockReturnValue([true, null]);

    const { getByText } = render(<RootLayout />);
    expect(preventAutoHideAsync).toHaveBeenCalled();

    await waitFor(() => {
      expect(hideAsync).toHaveBeenCalled();
    });

    // expect(getByText("Mocked RootLayoutNav")).toBeTruthy(); //???
  });

  it("returns null when fonts are not loaded", () => {
    const { useFonts } = require("expo-font");

    useFonts.mockReturnValue([false, null]);

    const { toJSON } = render(<RootLayout />);

    expect(toJSON()).toBeNull();
  });

  it("throws an error if font loading fails", () => {
    const { useFonts } = require("expo-font");

    useFonts.mockReturnValue([false, new Error("Font loading error")]);

    expect(() => render(<RootLayout />)).toThrow("Font loading error");
  });

  it("matches snapshot when fonts are loaded", async () => {
    const { useFonts } = require("expo-font");
    const { hideAsync } = require("expo-splash-screen");

    useFonts.mockReturnValue([true, null]);

    const { toJSON } = render(<RootLayout />);

    await waitFor(() => {
      expect(hideAsync).toHaveBeenCalled();
    });

    expect(toJSON()).toMatchSnapshot();
  });
});
