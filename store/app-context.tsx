import React, { createContext, useReducer, ReactNode } from "react";


/**
 * Represents the state of the application.
 */


// Define AppState type
interface AppState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Define action types
type Action =
  | { type: "Loading"; isLoading: boolean }
  | { type: "Authenticate"; isAuthenticated: boolean };

// Define context type
interface AppContextType extends AppState {
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

// Create context with default values
export const AppContext = createContext<AppContextType>({
  isAuthenticated: false,
  isLoading: false,
  setIsAuthenticated: () => {},
  setIsLoading: () => {},
});

// Reducer function
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "Loading":
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case "Authenticate":
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
      };
    default:
      return state;
  }
}

// Context provider component
interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, {
    isAuthenticated: false,
    isLoading: false,
  });

  const setIsAuthenticated = (isAuthenticated: boolean) => {
    dispatch({ type: "Authenticate", isAuthenticated });
  };

  const setIsLoading = (isLoading: boolean) => {
    dispatch({ type: "Loading", isLoading });
  };


  const ctxValue: AppContextType = {
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    setIsAuthenticated,
    setIsLoading,
  };

  return <AppContext.Provider value={ctxValue}>{children}</AppContext.Provider>;
};
