/**
 * Below are the colors that are used in the app.
 */

export const COLORS = {
  white: "#fff",
  offWhite: "#ECEDEE",
  black: "#000",
  darkGray: "#333",
  mediumGray: "#687076",
  lightGray: "#9BA1A6",
  primary: "#CD03EF",
  red: "#FF0000",
};

export const COLORTHEME = {
  light: {
    text: "#11181C",
    background: COLORS.white,
    tint: COLORS.mediumGray,
    icon: COLORS.mediumGray,
    tabIconDefault: COLORS.mediumGray,
    tabIconSelected: COLORS.mediumGray,
  },
  dark: {
    text: COLORS.offWhite,
    background: "#151718",
    tint: COLORS.white,
    icon: COLORS.lightGray,
    tabIconDefault: COLORS.lightGray,
    tabIconSelected: COLORS.white,
  },
};
