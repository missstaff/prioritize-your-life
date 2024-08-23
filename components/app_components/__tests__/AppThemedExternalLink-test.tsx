import { render, fireEvent } from "@testing-library/react-native";
import { openBrowserAsync } from "expo-web-browser";
import { AppThemedExternalLink } from "../AppThemedExternalLink";
import { Platform } from "react-native";

jest.mock("expo-web-browser", () => ({
  openBrowserAsync: jest.fn(),
}));

describe("AppThemedExternalLink", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockHref = "https://example.com";
  const mockStyle = { fontSize: 16 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the external link component", () => {
    const { getByTestId } = render(
      <AppThemedExternalLink href={mockHref} style={mockStyle} />
    );
    const externalLink = getByTestId("external-link");
    expect(externalLink).toBeDefined();
  });

});
