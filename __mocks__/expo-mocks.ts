jest.mock("expo-web-browser", () => ({
  openBrowserAsync: jest.fn(),
}));