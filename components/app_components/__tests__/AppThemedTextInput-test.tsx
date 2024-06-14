import * as React from "react";
import renderer from "react-test-renderer";
import { AppThemedTextInput } from "../AppThemedTextInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import { render, fireEvent } from "@testing-library/react-native";

describe("AppThemedTextInput Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`renders correctly`, () => {
    const tree = renderer
      .create(
        <AppThemedTextInput
          placeholder="Snapshot test!"
          secureEntry={false}
          value=""
          checkValue={() => {}}
          setValue={() => {}}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with dark theme", () => {
    const mockDarkColor = "#000000";
    (useThemeColor as jest.Mock).mockReturnValue(mockDarkColor);
    const tree = renderer
      .create(
        <AppThemedTextInput
          placeholder="Snapshot test!"
          secureEntry={false}
          value=""
          checkValue={() => {}}
          setValue={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with light theme", () => {
    const mockLightColor = "#ffffff";
    (useThemeColor as jest.Mock).mockReturnValue(mockLightColor);
    const tree = renderer
      .create(
        <AppThemedTextInput
          placeholder="Snapshot test!"
          secureEntry={false}
          value=""
          checkValue={() => {}}
          setValue={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it("updates value correctly when typing", () => {
  //   const mockSetValue = jest.fn();
  //   const { getByPlaceholderText } = render(
  //     <AppThemedTextInput
  //       placeholder="Type here..."
  //       secureEntry={false}
  //       value=""
  //       checkValue={() => {}}
  //       setValue={mockSetValue}
  //     />
  //   );

  //   const input = getByPlaceholderText("Type here...");

  //   fireEvent.changeText(input, { target: { value: 'Hello, World!' } });

  //   expect(mockSetValue).toHaveBeenCalledWith("Hello, World!");
  // });
});
