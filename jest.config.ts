import type { Config } from "@jest/types";

/**
 * Configuration options for Jest.
 *
 * @typedef {Object} Config.InitialOptions
 * @property {string} preset - The preset to use for Jest.
 * @property {string[]} setupFiles - An array of setup files to be run before each test.
 * @property {string[]} transformIgnorePatterns - An array of patterns to ignore when transforming files.
 */
const config: Config.InitialOptions = {
  preset: "jest-expo",
  setupFiles: ["./__mocks__/jest.setup.ts"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
};

export default config;
