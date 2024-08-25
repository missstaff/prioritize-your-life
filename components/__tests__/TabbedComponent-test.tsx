import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import TabbedComponent from "@/components/TabbedComponent";
import { AppThemedText } from "@/components/app_components/AppThemedText";

describe("TabbedComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockSetSelectedTab = jest.fn();
  const tabs = ["Tab 1", "Tab 2", "Tab 3"];
  const children = [
    <AppThemedText key="0">Content for Tab 1</AppThemedText>,
    <AppThemedText key="1">Content for Tab 2</AppThemedText>,
    <AppThemedText key="2">Content for Tab 3</AppThemedText>,
  ];

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <TabbedComponent
          selectedTab={0}
          setSelectedTab={mockSetSelectedTab}
          tabs={tabs}
        >
          {children}
        </TabbedComponent>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with given tabs", () => {
    const { getByText } = render(
      <TabbedComponent
        selectedTab={0}
        setSelectedTab={mockSetSelectedTab}
        tabs={tabs}
      >
        {children}
      </TabbedComponent>
    );

    tabs.forEach((tab) => {
      expect(getByText(tab)).toBeTruthy();
    });
  });

  it("calls setSelectedTab when a tab is pressed", () => {
    const { getByText } = render(
      <TabbedComponent
        selectedTab={0}
        setSelectedTab={mockSetSelectedTab}
        tabs={tabs}
      >
        {children}
      </TabbedComponent>
    );

    fireEvent.press(getByText("Tab 2"));
    expect(mockSetSelectedTab).toHaveBeenCalledWith(1);

    fireEvent.press(getByText("Tab 3"));
    expect(mockSetSelectedTab).toHaveBeenCalledWith(2);
  });

  it("displays the correct content for the selected tab", () => {
    const { getByText, rerender } = render(
      <TabbedComponent
        selectedTab={0}
        setSelectedTab={mockSetSelectedTab}
        tabs={tabs}
      >
        {children}
      </TabbedComponent>
    );

    expect(getByText("Content for Tab 1")).toBeTruthy();

    rerender(
      <TabbedComponent
        selectedTab={1}
        setSelectedTab={mockSetSelectedTab}
        tabs={tabs}
      >
        {children}
      </TabbedComponent>
    );

    expect(getByText("Content for Tab 2")).toBeTruthy();

    rerender(
      <TabbedComponent
        selectedTab={2}
        setSelectedTab={mockSetSelectedTab}
        tabs={tabs}
      >
        {children}
      </TabbedComponent>
    );

    expect(getByText("Content for Tab 3")).toBeTruthy();
  });
});
