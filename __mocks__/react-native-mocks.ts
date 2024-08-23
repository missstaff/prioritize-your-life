jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => { };
  return Reanimated;
});

jest.mock(
  "react-native/Libraries/Components/AccessibilityInfo/AccessibilityInfo"
);

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("@dev-plugins/react-navigation", () => ({
  useReactNavigationDevTools: jest.fn(),
}));

jest.mock("@react-native-community/netinfo", () => ({
  addEventListener: jest.fn(),
}));

jest.mock("react-native-toast-message", () => ({
  show: jest.fn(),
}));
