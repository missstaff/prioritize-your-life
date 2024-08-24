import { render } from "@testing-library/react-native";
import { AppThemedExternalLink } from "../AppThemedExternalLink";

jest.mock("expo-web-browser", () => ({
  openBrowserAsync: jest.fn(),
}));

describe("AppThemedExternalLink", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockHref = "https://example.com";
  const mockStyle = { fontSize: 16 };

  it("matches snapshot", () => {
    const { toJSON } = render(
      <AppThemedExternalLink href={mockHref} style={mockStyle} />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders the external link component", () => {
    const { getByTestId } = render(
      <AppThemedExternalLink href={mockHref} style={mockStyle} />
    );
    const externalLink = getByTestId("external-link");
    expect(externalLink).toBeDefined();
  });
});
