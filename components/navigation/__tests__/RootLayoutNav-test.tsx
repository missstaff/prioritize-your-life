import React from "react";
import { render, act, waitFor } from "@testing-library/react-native";
import { AppState } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import RootLayoutNav from "../RootLayoutNav"; 
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
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
    // it("renders RootLayoutNav when fonts are loaded", async () => {
    //   const { useFonts } = require("expo-font");
    //   const { preventAutoHideAsync, hideAsync } = require("expo-splash-screen");
  
    //   // Mock the font loading to simulate success
    //   useFonts.mockReturnValue([true, null]);
  
    //   const { getByText } = render(<RootLayout />);
  
    //   // Ensure splash screen prevent/hide functions are called
    //   expect(preventAutoHideAsync).toHaveBeenCalled();
  
    //   // Wait for the fonts to load and splash screen to hide
    //   await waitFor(() => {
    //     expect(hideAsync).toHaveBeenCalled();
    //   });
  
    //   // Check if RootLayoutNav is rendered
    //   expect(getByText("Mocked RootLayoutNav")).toBeTruthy();
    // });
  
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
  });