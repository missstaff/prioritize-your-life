jest.mock("@dev-plugins/react-query", () => ({
  useReactQueryDevTools: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  QueryClient: jest.fn().mockImplementation(() => ({
    setQueryData: jest.fn(),
    setQueryClient: jest.fn(),
  })),
  QueryClientProvider: jest.requireActual("@tanstack/react-query")
    .QueryClientProvider,
}));
