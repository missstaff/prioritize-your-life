jest.mock("expo-web-browser", () => ({
  openBrowserAsync: jest.fn(),
}));

jest.mock('expo-router', () => ({
  Link: jest.fn().mockImplementation(({ children }) => children), 
  Stack: jest.fn(),
  Tabs: jest.fn(), 
  useNavigationContainerRef: jest.fn(), 
  useRouter: () => ({
    push: jest.fn(), 
    replace: jest.fn(), 
    back: jest.fn(),
  }),
  useNavigation: () => ({
    navigate: jest.fn(), 
    goBack: jest.fn(), 
    setOptions: jest.fn(), 
  }),
}));










