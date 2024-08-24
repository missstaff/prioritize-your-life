import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import AppModal from "../Modal";

describe("TransactionAppModal", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal content when visible is true", () => {
    const { getByText } = render(
      <AppModal onClose={jest.fn()} visible={true}>
        <Text>Modal Content</Text>
      </AppModal>
    );

    expect(getByText("Modal Content")).toBeTruthy();
  });

  it("does not render the modal content when visible is false", () => {
    const { queryByText } = render(
      <AppModal onClose={jest.fn()} visible={false}>
        <Text>Modal Content</Text>
      </AppModal>
    );

    expect(queryByText("Modal Content")).toBeNull();
  });

  it("calls the onClose function when the modal is closed", () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(
      <AppModal onClose={onClose} visible={true}>
        <Text>Modal Content</Text>
      </AppModal>
    );

    fireEvent(getByLabelText("Settings Modal"), "requestClose");

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
