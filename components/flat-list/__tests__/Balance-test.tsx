import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Balance, { AddTransactionProps } from "../Balance";
import { AppThemedText } from "../../app_components/AppThemedText";

jest.mock("../../app_components/AppThemedText", () => ({
  AppThemedText: jest.fn(({ children, onPress }) => (
    <div onClick={onPress}>{children}</div>
  )),
}));

describe("Balance Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with no data (shows $0.00)", () => {
    const mockSetIsVisible = jest.fn();

    const props: AddTransactionProps = {
      balance: 0,
      data: undefined,
      setIsVisible: mockSetIsVisible,
    };

    const { toJSON } = render(<Balance {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with data", () => {
    const mockSetIsVisible = jest.fn();

    const props: AddTransactionProps = {
      balance: 100,
      data: [
        {
          id: "1",
          amount: "100",
          date: new Date().toUTCString(),
          description: "Test",
          balance: 100,
        },
      ],
      setIsVisible: mockSetIsVisible,
    };

    const { toJSON } = render(<Balance {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders the balance correctly", () => {
    const mockSetIsVisible = jest.fn();

    const props: AddTransactionProps = {
      balance: 100,
      data: [
        {
          id: "1",
          amount: "100",
          date: new Date().toUTCString(),
          description: "Test",
          balance: 100,
        },
      ],
      setIsVisible: mockSetIsVisible,
    };

    render(<Balance {...props} />);

    // Assert that AppThemedText was called with the correct balance text
    expect(AppThemedText).toHaveBeenCalledWith(
      expect.objectContaining({
        children: "$100.00",
      }),
      {}
    );
  });

  //   it("renders Add Transaction link and triggers setIsVisible", () => {
  //     const mockSetIsVisible = jest.fn();

  //     const props: AddTransactionProps = {
  //       balance: 100,
  //       data: [
  //         {
  //           id: "1",
  //           amount: "100",
  //           date: new Date().toUTCString(),
  //           description: "Test",
  //           balance: 100,
  //         },
  //       ],
  //       setIsVisible: mockSetIsVisible,
  //     };

  //     const { getByText } = render(<Balance {...props} />);

  //     // Check if "Add Transaction" text is rendered
  //     const addTransactionLink = getByText("Add Transaction");

  //     // Simulate a press on the "Add Transaction" link
  //     fireEvent.press(addTransactionLink);

  //     // Ensure setIsVisible was called
  //     expect(mockSetIsVisible).toHaveBeenCalledWith(true);
  //   });
});
