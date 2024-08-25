import React from "react";
import { render } from "@testing-library/react-native";
import ListHeader, { ListHeaderProps } from "../ListHeader";
import { AppThemedText } from "../../app_components/AppThemedText";
import Column from "../../grid/Column";
import Row from "../../grid/Row";

// Mocking dependencies
jest.mock("../../grid/Row", () =>
  jest.fn(({ children }) => <div>{children}</div>)
);
jest.mock("../../grid/Column", () =>
  jest.fn(({ children }) => <div>{children}</div>)
);
jest.mock("../../app_components/AppThemedText", () => ({
  AppThemedText: jest.fn(({ children }) => <div>{children}</div>),
}));

describe("ListHeader Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockStyles = {
    fontSize: 16,
    color: "black",
  };

  const headings = ["Heading 1", "Heading 2", "Heading 3"];

  it("renders correctly with headings", () => {
    const props: ListHeaderProps = {
      styles: mockStyles,
      headings,
    };

    const { toJSON } = render(<ListHeader {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  // #TODO fix this test
  //   it("renders the correct number of headings", () => {
  //     const props: ListHeaderProps = {
  //       styles: mockStyles,
  //       headings,
  //     };

  //     const { getByText } = render(<ListHeader {...props} />);

  //     // Check if all headings are rendered
  //     headings.forEach((heading) => {
  //       expect(getByText(heading)).toBeTruthy();
  //     });

  //     // Check that Column was called for each heading
  //     expect(Column).toHaveBeenCalledTimes(headings.length);

  //     // Check that AppThemedText was called for each heading
  //     expect(AppThemedText).toHaveBeenCalledTimes(headings.length);
  //   });

  it("passes the correct styles to AppThemedText", () => {
    const props: ListHeaderProps = {
      styles: mockStyles,
      headings,
    };

    render(<ListHeader {...props} />);

    expect(AppThemedText).toHaveBeenCalledWith(
      expect.objectContaining({
        style: mockStyles,
      }),
      {}
    );
  });
});
