jest.mock("@/hooks/useThemeColor", () => ({
    useThemeColor: jest.fn().mockImplementation((colors, theme) => {
        return theme === "light" ? colors.light : colors.dark;
    }),
}));