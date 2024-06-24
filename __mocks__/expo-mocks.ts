jest.mock("expo-web-browser", () => ({
  openBrowserAsync: jest.fn(),
}));

// learno to mck router
// jest.mock('expo-router', () => ({
//   Link: jest.fn().mockImplementation(),
//   Stack: jest.fn(),
//   useNavigationContainerRef: jest.fn(),
// }));
