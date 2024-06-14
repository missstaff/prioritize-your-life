import "react-native-gesture-handler/jestSetup";


jest.mock("react-native/Libraries/Components/AccessibilityInfo/AccessibilityInfo");
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn().mockImplementation((colors, theme) => {
    return theme === "light" ? colors.light : colors.dark;
  }),
}));

jest.mock("expo-web-browser", () => ({
  openBrowserAsync: jest.fn(),
}));


