import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import AppThemedTextInput from "../AppThemedTextInput";
import { useThemeColor } from "@/hooks/useThemeColor";

jest.mock("@/hooks/useThemeColor", () => ({
  useThemeColor: jest.fn(),
}));

jest.mock("../AppIcon", () => ({
  AppIcon: jest.fn(() => null),
}));

describe("AppThemedTextInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockTextColor = "#000";
  const mockBackgroundColor = "#fff";

  beforeEach(() => {
    (useThemeColor as jest.Mock).mockImplementation((colors, key) => {
      return key === "text" ? mockTextColor : mockBackgroundColor;
    });
  });

  it("renders correctly and matches snapshot", () => {
    const { toJSON } = render(
      <AppThemedTextInput
        placeholder="Enter text"
        secureEntry={false}
        value=""
        setValue={() => {}}
        checkValue={() => {}}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("displays the placeholder text", () => {
    render(
      <AppThemedTextInput
        placeholder="Enter text"
        secureEntry={false}
        value=""
        setValue={() => {}}
        checkValue={() => {}}
      />
    );
    expect(screen.getByPlaceholderText("Enter text")).toBeTruthy();
  });

  it("handles text input changes", () => {
    const mockSetValue = jest.fn();
    render(
      <AppThemedTextInput
        placeholder="Enter text"
        secureEntry={false}
        value=""
        setValue={mockSetValue}
        checkValue={() => {}}
      />
    );
    fireEvent.changeText(screen.getByPlaceholderText("Enter text"), "New text");
    expect(mockSetValue).toHaveBeenCalledWith("New text");
  });

  it("calls checkValue on blur if value is not empty", () => {
    const mockCheckValue = jest.fn();
    render(
      <AppThemedTextInput
        placeholder="Enter text"
        secureEntry={false}
        value="Some value"
        setValue={() => {}}
        checkValue={mockCheckValue}
      />
    );
    fireEvent(screen.getByPlaceholderText("Enter text"), "blur");
    expect(mockCheckValue).toHaveBeenCalledWith("Some value");
  });

  // it("toggles password visibility when eye icon is pressed", () => {
  // #TODO - Add test for this
  // });

  // it("renders an icon if iconName prop is provided", () => {
  // #TODO - Add test for this
  // });
});
